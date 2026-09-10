const test = require('node:test');
const assert = require('node:assert/strict');

const handler = require('../api/generate');

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(value) {
      this.body = JSON.parse(value);
    }
  };
}

test('sends the selected server prompt and uploaded image to Gemini', async () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.GEMINI_API_KEY;
  const inputImage = Buffer.from('input-image').toString('base64');
  const finalImage = Buffer.from('generated-image').toString('base64');
  let request;

  process.env.GEMINI_API_KEY = 'test-key';
  global.fetch = async (url, options) => {
    request = { url, options, payload: JSON.parse(options.body) };
    return {
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [{
          content: {
            parts: [
              { inline_data: { mime_type: 'image/png', data: Buffer.from('draft').toString('base64') }, thought: true },
              { inlineData: { mimeType: 'image/png', data: finalImage } }
            ]
          }
        }]
      })
    };
  };

  try {
    const res = createResponse();
    await handler({
      method: 'POST',
      body: { styleId: 'mspaint', imageBase64: inputImage, mimeType: 'image/png' }
    }, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.image, finalImage);
    assert.equal(res.body.mimeType, 'image/png');
    assert.equal(res.body.debug.styleId, 'mspaint');
    assert.match(request.url, /\/v1\/models\/gemini-3\.1-flash-image:generateContent$/);
    assert.equal(request.payload.contents[0].role, 'user');
    assert.match(request.payload.contents[0].parts[0].text, /clumsy, scribbly/);
    assert.match(request.payload.contents[0].parts[0].text, /Do not return the input image unchanged/);
    assert.deepEqual(request.payload.contents[0].parts[1], {
      inline_data: { mime_type: 'image/png', data: inputImage }
    });
    assert.deepEqual(request.payload.generationConfig.responseModalities, ['IMAGE']);
  } finally {
    global.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalKey;
  }
});

test('rejects an unchanged Gemini image instead of displaying the upload', async () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.GEMINI_API_KEY;
  const inputImage = Buffer.from('same-image').toString('base64');

  process.env.GEMINI_API_KEY = 'test-key';
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({
      candidates: [{
        content: {
          parts: [{ inline_data: { mime_type: 'image/jpeg', data: inputImage } }]
        }
      }]
    })
  });

  try {
    const res = createResponse();
    await handler({
      method: 'POST',
      body: { styleId: 'anime', imageBase64: inputImage, mimeType: 'image/jpeg' }
    }, res);

    assert.equal(res.statusCode, 502);
    assert.match(res.body.error, /not transformed/);
    assert.equal(res.body.debug.styleId, 'anime');
  } finally {
    global.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalKey;
  }
});

