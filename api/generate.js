const { randomUUID } = require('node:crypto');

const STYLE_PROMPTS = {
  "mspaint": "Redraw the attached image in the most clumsy, scribbly, and utterly pathetic way possible. Use the same color palette, and make it look like it was drawn in MS Paint with a mouse. It should be vaguely similar but also not really, kind of matching but also off in a confusing, awkward way, with that low-quality pixel-by-pixel feel that really emphasizes how ridiculously bad it is.",
  "storybook": "Transform the uploaded photo into a charming cute storybook illustration. Preserve the original composition, camera angle, perspective, lighting direction, pose, facial expressions, and all recognizable people and important objects. Redraw the entire scene as a playful hand-drawn 2D illustration while keeping everyone easily recognizable. Simplify the whole image into soft rounded shapes with a clean, childlike aesthetic. Characters should have slightly oversized heads, simple dot eyes, tiny rounded nose, small smiling mouth, rosy cheeks, soft rounded face, minimal facial features, natural body proportions, slightly simplified hairstyles while preserving the original hairstyle and hair color, and recognizable clothing colors and silhouettes. Keep the personalities and relationships between people unchanged. Replace realistic textures with smooth hand-painted flat color blocks. Use soft, slightly uneven hand-drawn outlines instead of perfect vector lines. Brush strokes should feel natural and handcrafted. Keep shading extremely simple with only soft color transitions. Avoid realistic rendering. The background should be simplified into clean geometric shapes while preserving the recognizable environment. Large objects such as buildings, trees, furniture, streets, vehicles, windows, doors, plants, and clouds should become simplified illustrated forms with rounded edges. Place the subjects on a clean white or very light neutral background with generous negative space. Around the characters, add playful childlike doodle decorations inspired by the original scene, such as a smiling sun, fluffy clouds, colorful stars, little hearts, flowers, leaves, sparkles, tiny trees, little houses, simple cars, and birds. Decorations should feel spontaneous and hand drawn, like a child joyfully doodled around a favorite photo. Do not cover the faces or important subjects, and keep the doodles balanced around the composition. Use a bright cheerful color palette of ivory white, cream, sky blue, cobalt blue, turquoise, coral pink, cherry blossom pink, peach, lemon yellow, sunflower yellow, warm orange, apple green, sage green, emerald green, lavender, and warm brown. Increase brightness slightly and keep colors vibrant but harmonious. Lighting should feel soft, sunny, optimistic, and full of warmth. The final illustration should resemble a modern children's picture book combined with a playful sticker sheet: cute, happy, playful, cozy, innocent, bright, warm, joyful, gentle, minimal, handmade, whimsical, friendly. No photorealism, no anime, no manga, no 3D rendering, no realistic painting, no glossy effects, no heavy shadows, no dramatic lighting, no realistic skin texture, no excessive detail, no text, no watermark, no logos, no signatures.",
  "watercolor": "Transform the uploaded photo into a bright hand-painted gouache illustration on textured watercolor paper. Reimagine the scene as a cheerful editorial illustration from a modern lifestyle magazine. Keep the original composition, perspective, lighting direction, and recognizable subjects, but simplify everything into bold painted shapes with a handcrafted appearance. Paint using opaque gouache with visible brush strokes, dry-brush textures, soft pigment overlaps, watercolor paper grain, and slightly imperfect handmade edges. Replace photographic detail with expressive painted forms. Use confident painterly shapes instead of realism. Avoid gradients and glossy rendering. All surfaces should appear matte and naturally hand painted. Simplify objects into clean geometric forms while keeping them recognizable. Increase overall brightness significantly and color vibrancy while keeping colors harmonious. Use a fresh spring palette instead of vintage tones: ivory white, pure white, fresh sky blue, cerulean blue, turquoise, coral pink, cherry blossom pink, peach, warm orange, fresh leaf green, emerald green, olive green, lemon yellow. The artwork should feel filled with natural daylight, with luminous highlights and soft colorful shadows rather than gray. Avoid muddy colors, yellow color cast, sepia tones, or dull muted colors. Keep the paper texture subtle, with brush strokes visible but clean, and edges naturally painted rather than rough. The illustration should feel bright, fresh, airy, peaceful, cheerful, spring-like, optimistic, cozy, elegant, editorial — like a beautifully illustrated lifestyle magazine or premium picture book. Do not imitate any existing artist, animation, or copyrighted style. No photorealism, no anime, no 3D rendering, no vector graphics, no digital painting effects, no heavy outlines, no excessive details.",
  "crayon": "现在你是幼儿园小孩，请把整张图片用蜡笔画出来！不要模仿任何已有动漫、IP、艺术家风格！不要有太多的细节，复杂的地方可以一笔带过，带一点笨拙的感觉，颜色可以大胆一点，有些地方可以用完全不一样的颜色，但像草莓这种有固定颜色的一定要用那个颜色，并且要有一种画在白纸上的感觉。可以在空白处或者物品上面叠涂加点五颜六色的点缀，蜡笔的笔触可以不一致，像真实蜡笔一样可以有蜡笔屑，也可以有叠涂后稍微凸起来的效果，或者颜色蹭上去的感觉，构图不要太成熟，可以稍微无逻辑，线条随意不能笔直，比例不用一模一样，不要有照着图片画的感觉，也不能有大人帮忙画的感觉，稍微丑不拉几也可以，要的就是好奇怪但有点治愈这种丑萌丑萌的感觉～",
  "anime": "Redraw this photo in a vibrant Japanese anime illustration style: clean cel-shaded coloring, bold clean linework, large expressive eyes, glossy highlights on hair, stylized dramatic lighting. Preserve the exact subject, pose, composition, and framing of the original photo.",
  "theatrical3d": "Transform the uploaded pet photo into a premium theatrical-quality 3D animated character while faithfully preserving the exact identity, personality, expression, pose, and composition of the original image. This is a stylization only — do NOT redesign the pet. The final image must be instantly recognizable as the exact same individual pet. IDENTITY PRESERVATION (highest priority): preserve the exact individual pet, not another animal of the same breed. Maintain identity-level accuracy for species, breed, age, body proportions, body size, weight, silhouette, facial structure, head shape, muzzle shape, nose size, color and texture, whiskers and their placement and length, eye shape, size, spacing, angle, eyelids, iris color, pupil size, eye highlights, ear shape, size, position and rotation, fur color and pattern, asymmetrical markings, facial markings, fur density and length, fluffy areas, tail, paw size, neck, chest fluff, and all unique physical characteristics. Do not simplify or redesign any recognizable features. EXPRESSION PRESERVATION (critical, second highest priority): treat the original facial expression as immutable — style may change, emotion must never change. Capture every subtle facial detail with precision: eyelid openness and tension, upper and lower eyelid shape, eye direction and focus, pupil direction and position, eyebrow position and tension if visible, cheek tension, muzzle tension, mouth shape and corners, lip compression, chin position, jaw relaxation, facial asymmetry, head tilt, neck posture, ear angle and rotation. If the pet appears smug, sassy, aloof, judgmental, unimpressed, sleepy, grumpy, proud, stubborn, sarcastic, curious, confused, guilty, nervous, relaxed, mischievous, or shy, the final image must preserve that exact emotion — never replace it with smiling, excited, surprised, overly happy, exaggerated cartoon acting, generic cute expression, puppy eyes, cheerful expression, or dramatic facial acting. POSE & COMPOSITION LOCK: preserve exactly the pose, body language, paw positions, tail position, head angle, camera angle, perspective, framing, crop, composition, lighting direction, shadows, environment, object placement, and background layout. Do not change the camera, reposition the pet, or invent new objects. ANIMATION STYLE: render the image as a premium theatrical-quality 3D animated feature film, faithfully emulating the distinctive visual language of The Secret Life of Pets — its premium theatrical CGI aesthetic, appealing character design philosophy, luxurious fur rendering, expressive yet restrained facial animation, cinematic lighting, color harmony, material realism, and polished feature-film production quality. This is strictly a style transfer, not a redesign or reinterpretation. Use premium CGI fur with realistic layered fur simulation, ultra-soft fluffy coat, individually rendered fur strands, soft volumetric lighting, global illumination, physically based rendering, subsurface scattering, rich cinematic color grading, natural reflections, subtle eye moisture, realistic whiskers, premium grooming detail, soft ambient bounce light, cinematic depth of field, soft contact shadows, elegant rim lighting, and highly polished feature-film shading. Large expressive eyes are acceptable only if they preserve the exact original eye shape, eyelid position, gaze direction, personality, and emotional expression. Identity always has priority over stylization. RENDER QUALITY: ultra detailed, 8K, film-quality rendering, premium CGI, highly detailed fur, cinematic lighting, professional color grading, sharp facial details, natural textures, soft realistic shadows, exceptional micro-detail, award-winning animated feature quality. Do NOT: redesign the face or body, alter identity, markings, fur colors, body proportions, the pose, camera angle, composition, eye direction, or eyelid position; enlarge the eyes unnaturally or create oversized baby eyes; add eyelashes; make the pet smile, look happier, surprised, excited, or friendlier; replace the original emotion; exaggerate facial expressions; use generic cute expressions; over-anthropomorphize the pet; distort anatomy; over-cartoonize the character; simplify facial structure or fur markings; remove subtle facial asymmetry; change the personality; or create a different pet of the same breed.",
  "feltcraft": "Reimagine this photo as if every object and surface were handcrafted from needle-felted wool: soft fuzzy fiber texture, rounded plush forms, visible individual wool fibers, cozy handmade charm. Use a bright, cheerful, pastel-inspired color palette with clean ivory whites, creamy neutrals, soft sky blues, gentle blush pinks, warm honey browns, and fresh natural tones. Colors should feel light, airy, cozy, and joyful while remaining elegant and harmonious. Increase overall brightness and color clarity without becoming oversaturated. Avoid muddy, dark, yellowish, gray, or vintage tones. Illuminate the scene with soft natural daylight, bright ambient lighting, subtle global illumination, delicate bloom, clean highlights, and gentle soft shadows to create a fresh, uplifting storybook atmosphere. The wool fibers should appear fluffy, clean, soft, and freshly crafted, with vibrant premium felt colors rather than aged or dusty wool. Every object should feel irresistibly cute, rounded, cozy, and full of handcrafted charm, inspired by luxury children's picture books, premium handmade felt toys, and Japanese needle-felt craftsmanship. Preserve the exact subject, pose, composition, and framing of the original photo.",
  "luxurypet": "Transform the uploaded pet photo into an ultra-luxury fashion editorial magazine cover. Preserve the pet's exact identity, breed, facial structure, fur pattern, eye color, whiskers, ears, nose, expression, proportions, pose, body shape, and all recognizable characteristics. The pet must remain instantly recognizable. Reimagine the pet as the star of an international luxury fashion editorial while maintaining complete realism. Dress the pet in sophisticated haute couture inspired by Paris Fashion Week. The styling should feel elegant, timeless, minimal, and luxurious, using wardrobe such as a tailored couture dress, sculptural fashion silhouette, luxury knitwear, oversized cashmere coat, silk blouse, velvet cape, elegant tuxedo, or minimalist couture outfit in premium fashion fabrics. Optional luxury accessories include a black beret, silk ribbon, pearl necklace, luxury leather collar, oversized bow, elegant hat, gold accessories, or fashion scarf, kept tasteful and never overpowering the pet. Photograph the pet like a world-famous luxury fashion campaign: medium-format camera, 85mm fashion portrait lens, soft diffused studio lighting, subtle rim lighting, beauty lighting, shallow depth of field, tack-sharp focus on the eyes, cinematic composition, premium luxury color grading, museum-quality photography, natural fur texture, realistic lighting, ultra-high detail. The pet should occupy approximately 60-70% of the frame, centered with balanced composition, placed against a clean luxury editorial background using elegant neutral colors such as ivory, cream, warm beige, camel, mocha, taupe, chocolate brown, charcoal, soft gray, or muted earth tones. Create a premium fashion magazine cover layout including one oversized elegant magazine masthead across the top, luxurious high-contrast serif typography, refined typography hierarchy, multiple sophisticated fashion headlines, issue date, volume number, barcode, subtle editorial captions, generous negative space, and clean luxury graphic design. Use an original fictional magazine title instead of copying any real publication, with typography inspired by the world's finest luxury fashion magazines without reproducing any existing logo. Overall aesthetic: quiet luxury, old money elegance, Paris haute couture, editorial fashion photography, minimalism, timeless sophistication, high-end luxury branding, museum-quality fashion imagery, international magazine cover, award-winning editorial photography, photorealistic, extremely realistic, ultra detailed, 8K resolution, natural fur texture, luxury editorial styling, perfect composition. No cartoon. No illustration. No painting. No CGI. No anime. No distorted anatomy. No extra limbs. No blurry eyes. No low-quality typography. No watermark. No AI artifacts.",
  "cyberpunk": "Transform the uploaded image into a sophisticated high-end cyberpunk sci-fi scene while faithfully preserving the original subject, architecture, camera angle, perspective, composition, framing, spatial relationships, and all recognizable visual elements. Reimagine the scene as a technologically advanced near-future metropolis with refined cinematic production design, intelligent infrastructure, and premium architectural lighting. Use a controlled futuristic color palette dominated by deep midnight blue, graphite black, electric cyan, ultraviolet, subtle magenta, and restrained amber accents. Avoid covering the entire image in oversaturated pink neon. Create layered futuristic lighting with: precise cyan edge lighting, subtle ultraviolet atmospheric glow, luminous architectural outlines, intelligent LED facade systems, holographic reflections, soft volumetric light beams, glowing glass surfaces, dynamic digital displays, subtle chromatic aberration, realistic light scattering through mist. Add advanced technology naturally into the environment: transparent holographic interfaces, augmented-reality navigation graphics, floating data projections, autonomous vehicles, aerial traffic lanes, intelligent road systems, robotic infrastructure, biometric security panels, digital wayfinding systems, futuristic communication towers, energy conduits, interactive glass architecture, subtle drones in the distance. Keep the technology integrated into the scene rather than randomly placed. The architecture should feel monumental, intelligent, and highly engineered, combining futuristic glass towers, dark metallic structures, illuminated structural frameworks, layered skybridges, and advanced urban infrastructure. Create strong cinematic depth with atmospheric perspective, distant haze, low clouds, subtle rain particles, wet reflective surfaces, and controlled volumetric fog. Use realistic reflections on glass, metal, roads, windows, and polished surfaces. Lighting should feel dramatic but refined, with high contrast between deep shadows and carefully placed luminous accents. Preserve fine architectural details while enhancing them with futuristic materials such as smoked glass, brushed titanium, black chrome, carbon fiber, translucent polymers, and illuminated composite panels. The final image should feel like a premium science-fiction film still, futuristic architectural visualization, and high-end concept art rather than a colorful cyberpunk poster. Ultra-detailed. Cinematic. Photorealistic. High dynamic range. Sharp architectural detail. Realistic global illumination. Volumetric atmosphere. Premium production design. No text. No logos. No watermark.",
  "postcard": "请根据我提供的真实照片，依次对应生成一张上下分区的冰箱贴摄影海报，整体参考\"小红书城市打卡/建筑冰箱贴/极简拼贴\"风格。【画面结构】画面为竖版构图，比例 3:4，整张图分为上下两个部分。上半部分占画面约50%，为极简纯色背景；下半部分占画面约50%，为我提供的原图，如果比例不太对可以缩放或裁切成合适的样子。【上半部分：建筑冰箱贴图标】画面为极简纯色背景，背景颜色从提供的照片中提取主要色调，例如建筑墙面的蓝色、黄色、红色、绿色，或照片中最强烈的环境色。背景纯色要饱和、干净、有旅行明信片感，不要使用渐变，不要加入复杂图案。【冰箱贴图标】从照片中提取最有识别度的主体元素，例如窗户、门廊、立面、拱门、屋顶、阳台或建筑正面，如果有人物和动物也可以放进去，转化为一个简约的\"冰箱贴式图标\"：保留核心轮廓和标志性特征；造型简洁干净，像旅行纪念品冰箱贴；有轻微立体感和投影；边缘清晰，白色或浅色描边；细节适度简化，不要画得太复杂。整体气质要像一张高级旅行摄影卡片：真实照片+极简建筑冰箱贴+主色背景+轻盈文字排版，风格清爽干净明亮，有城市漫游感，强调建筑识别度、色彩记忆点和小红书旅行打卡氛围。避免：不要做成普通拼贴，不要把上半部分画得复杂，不要添加多余装饰元素，不要改变下半部分照片，不要出现乱码文字，不要过度卡通化，不要让建筑图标太大，不要让文字压住建筑主体。",
  "voxel": "请基于用户上传的真实户外照片进行风格化改造。目标效果是：真实主体保留在原地，周围环境被完整改造成高统一度的方块体素沙盒世界，类似 Minecraft 风格的自然场景，但不要出现游戏 UI、logo、文字、怪物或额外角色。请先自动识别画面中的主要主体。如果画面中有人物或动物，请严格保留主体的外貌识别度、姿态、站位、服装、毛发、表情、身体比例、光照关系和真实摄影感；不要换脸，不要改变身份，不要把主体做成像素人或卡通角色。如果画面中没有人物或动物，请把画面中最主要的建筑、树木、车辆、器物、桥梁或其他视觉焦点作为主体，保留其原始位置、轮廓、结构关系和识别度，可以轻度融入方块世界，但不要彻底重绘或改变主体身份。除主体之外，请将整个环境统一改造成强烈的方块体素沙盒世界，前景、中景、远景都要完成转化，环境方块化覆盖率建议达到 80%–95%。地面应转化为阶梯式方块地形，包含清晰的草方块、泥土方块、沙地方块或石块层级。草地要接近 Minecraft 高草，轻薄、竖直、有方块感，不要变成厚重毛毯或真实草坪。水面要更平面化，带像素网格反光和块状浅滩，不要出现真实海浪或复杂浪花。树木和灌木应变成方块树干与立方体叶簇，但要保留原来的树冠位置、遮挡关系和空间层次。云朵要更浅更轻，呈现半透明的矩形块云，不要过厚或过写实。建筑、桥、栏杆、道路、远山、岸线、灯杆等环境元素应保留原有透视和位置，但表面转化为像素贴图和清晰的体素结构。请严格保留原图的大体构图、视角、透视、焦距感、景深、光线方向、时间氛围和主体站位。负面要求：不要换脸，不要改变人物身份，不要改变服装主要颜色，不要添加不存在的人、动物、文字、水印、游戏界面、怪物、武器或明显不属于原图的装饰物；不要把主体彻底像素化；不要让水面变成真实海浪；不要让草地变成厚重毛毯；不要只在局部添加方块元素。",
  "editorial": "Transform the image into a warm, modern editorial flat illustration while faithfully preserving the original composition and important objects. Use clean geometric shapes, simplified forms, and hand-painted digital brush textures instead of realistic rendering. Create soft irregular edges with subtle painterly imperfections rather than crisp vector graphics. Apply visible gouache and dry-brush textures throughout every object. Use bold but harmonious color blocking with slightly muted saturation. Keep lighting minimal and stylized, avoiding realistic shadows. Add subtle grain, paper texture, and brushstroke variation to create a handcrafted digital illustration feel. Simplify every object into large graphic color shapes while preserving recognizable silhouettes. Use modern editorial illustration aesthetics inspired by lifestyle magazines and contemporary children's books. Maintain balanced composition, generous negative space, and clean visual hierarchy. Avoid realism. Avoid 3D rendering. Avoid anime. Avoid glossy materials. Avoid photorealistic textures. Ultra detailed. High resolution."
};

const GEMINI_MODEL = 'gemini-3.1-flash-image';
const MAX_BASE64_LENGTH = 4_000_000;
const EDIT_INSTRUCTION = [
  'Edit the supplied image into a new, visibly transformed image.',
  'Use the supplied image as the subject and composition reference, and apply the selected style instructions strongly across the result.',
  'Do not return the input image unchanged or merely describe the edit.',
  'Return the finished edited image.'
].join(' ');

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp'
]);

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function getInlineImage(part) {
  const inline = part?.inlineData || part?.inline_data;
  const data = inline?.data;
  const mimeType = inline?.mimeType || inline?.mime_type;

  if (part?.thought === true || typeof data !== 'string' || !mimeType?.startsWith('image/')) {
    return null;
  }

  return { data, mimeType };
}

function isValidBase64(value) {
  if (!value || value.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) {
    return false;
  }

  try {
    return Buffer.from(value, 'base64').toString('base64') === value;
  } catch (error) {
    return false;
  }
}

module.exports = async function handler(req, res) {
  const requestId = randomUUID().replaceAll('-', '').slice(0, 12);
  res.setHeader('X-Artly-Request-Id', requestId);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed.', debug: { requestId } });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { styleId, imageBase64, mimeType } = body;
    const normalizedStyleId = typeof styleId === 'string' ? styleId.trim() : '';
    const normalizedMimeType = typeof mimeType === 'string' ? mimeType.toLowerCase().trim() : '';
    const normalizedImage = typeof imageBase64 === 'string' ? imageBase64.replace(/\s/g, '') : '';
    const debug = {
      requestId,
      styleId: normalizedStyleId || null,
      model: GEMINI_MODEL,
      inputMimeType: normalizedMimeType || null
    };

    if (!normalizedStyleId || !STYLE_PROMPTS[normalizedStyleId]) {
      return sendJson(res, 400, { error: 'Please choose a valid Artly style.', debug });
    }

    if (!normalizedImage) {
      return sendJson(res, 400, { error: 'Please upload or take a photo first.', debug });
    }

    if (!ALLOWED_MIME_TYPES.has(normalizedMimeType)) {
      return sendJson(res, 415, { error: 'Please use a JPG, PNG, or WebP image.', debug });
    }

    // Keep the JSON request below Vercel's 4.5 MB function body limit.
    if (normalizedImage.length > MAX_BASE64_LENGTH) {
      return sendJson(res, 413, { error: 'This photo is too large. Please choose an image under 3 MB.', debug });
    }

    if (!isValidBase64(normalizedImage)) {
      return sendJson(res, 400, { error: 'The uploaded image data is invalid. Please choose the photo again.', debug });
    }

    const inputBytes = Buffer.from(normalizedImage, 'base64').length;
    const prompt = `${EDIT_INSTRUCTION}\n\nSelected style instructions:\n${STYLE_PROMPTS[normalizedStyleId]}`;
    debug.inputBytes = inputBytes;
    debug.promptChars = prompt.length;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Artly configuration error.', { requestId, reason: 'missing_api_key' });
      return sendJson(res, 500, { error: 'The image service is not configured yet.', debug });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

    console.info('Artly generation started.', debug);

    const geminiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      signal: AbortSignal.timeout(55_000),
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: normalizedMimeType,
                data: normalizedImage
              }
            }
          ]
        }],
        generationConfig: { responseModalities: ['IMAGE'] }
      })
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error('Gemini API error.', {
        requestId,
        httpStatus: geminiResponse.status,
        errorCode: data?.error?.status || data?.error?.code || null
      });
      return sendJson(res, geminiResponse.status, {
        error: 'The image service could not create this image. Please try again.',
        debug
      });
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    // Gemini 3 image models can return intermediate thought images. The final
    // non-thought image is the user-facing result.
    const generatedImages = parts.map(getInlineImage).filter(Boolean);
    const generatedImage = generatedImages.at(-1);

    if (!generatedImage || !isValidBase64(generatedImage.data)) {
      console.error('Gemini returned no usable final image.', {
        requestId,
        finishReason: data?.candidates?.[0]?.finishReason || null,
        candidateCount: data?.candidates?.length || 0,
        partCount: parts.length
      });
      return sendJson(res, 502, {
        error: 'No finished image was returned. Please try another photo or style.',
        debug
      });
    }

    if (generatedImage.data === normalizedImage) {
      console.error('Gemini returned the input image unchanged.', { requestId, styleId: normalizedStyleId });
      return sendJson(res, 502, {
        error: 'The image was not transformed. Please try again.',
        debug
      });
    }

    debug.outputMimeType = generatedImage.mimeType;
    debug.outputBytes = Buffer.from(generatedImage.data, 'base64').length;
    console.info('Artly generation completed.', debug);

    return sendJson(res, 200, {
      image: generatedImage.data,
      mimeType: generatedImage.mimeType,
      debug
    });
  } catch (error) {
    const reason = error?.name === 'TimeoutError' ? 'gemini_timeout' : 'unexpected_error';
    console.error('Artly generation error.', { requestId, reason });
    return sendJson(res, 500, {
      error: reason === 'gemini_timeout'
        ? 'Image creation took too long. Please try again.'
        : 'Something went wrong while creating your image.',
      debug: { requestId, model: GEMINI_MODEL }
    });
  }
};
