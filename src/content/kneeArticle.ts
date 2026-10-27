import type { BlogArticle } from './blogPosts';
import cover from '@/assets/blog/knee/cover.asset.json';
import card from '@/assets/blog/knee/card.asset.json';
import xray from '@/assets/blog/knee/xray.asset.json';
import balance from '@/assets/blog/knee/balance.asset.json';
import walking from '@/assets/blog/knee/walking.asset.json';
import clinic from '@/assets/blog/knee/clinic.asset.json';
import doctor from '@/assets/blog/knee/doctor.asset.json';
const p = (text: string) => ({ type: 'p' as const, text });
const h = (text: string) => ({ type: 'h3' as const, text });
const ul = (...text: string[]) => ({ type: 'ul' as const, items: text.map(text => ({text})) });
export const kneeArticle: BlogArticle = {
 slug: 'knee-osteoarthritis-symptoms-treatment', categoryKey: 'musculoskeletal-health',
 title: 'Knee Osteoarthritis: Symptoms, Exercise and Treatment Options',
 seoTitle: 'Knee Osteoarthritis: Symptoms & Treatment | ClynicQ',
 metaDescription: 'Learn about knee osteoarthritis symptoms, exercise and treatment options, plus when to seek medical advice for knee pain in Singapore.',
 excerpt: 'Learn about knee osteoarthritis symptoms, exercise and treatment options, plus when to seek medical advice for knee pain in Singapore.',
 image: cover.url, imageAlt: 'Dr Chung Wing Hong, Family Physician at Chung & Ee Medical Clinic — caring for families from childhood to joint health', imageFit: 'contain',
 cardImage: { image: card.url, imageAlt: 'Illustration of hands holding a knee with the painful area highlighted in red', caption: 'Knee-pain illustration reproduced from the supplied presentation.' },
 tags: ['Knee Osteoarthritis', 'Knee Pain', 'Joint Health', 'Exercise', 'Healthy Ageing'],
 author: { name: 'Dr Chung Wing Hong', byline: 'By Dr Chung Wing Hong', designation: 'Family Physician, Chung & Ee Medical Clinic', qualifications: 'MBBS (Singapore), MRCP (United Kingdom), M Med Internal Medicine (Singapore), GDFM (Singapore)', clinicName: 'Chung & Ee Medical Clinic', href: 'https://www.clynicq.com/?clinic=agksee4qjo', address: 'Clinic: 10 Telok Blangah Crescent, #01-151, Singapore 090010', image: doctor.url, imageAlt: 'Dr Chung Wing Hong in a blue checked suit', clinicImage: clinic.url, clinicImageAlt: 'Chung & Ee Medical Clinic storefront with its signboard and glass entrance', note: 'This article is based on Dr Chung’s knee osteoarthritis presentation, with supporting references.' },
 intro: [
 'Does your knee hurt when climbing stairs? Feel stiff after sitting? Or make your usual walk less comfortable?',
 'These can be symptoms of knee osteoarthritis, but knee pain can have other causes too. A clinical assessment helps you understand what is happening and which steps may help.',
 'A diagnosis of knee arthritis does not automatically mean surgery or giving up the activities you enjoy. Treatment often starts with exercise, practical lifestyle changes and a plan suited to your needs.'
 ],
 sections: [
 {heading: 'What is knee osteoarthritis?', images: [{image: xray.url, imageAlt: 'Labelled X-rays comparing a normal knee joint and an arthritic knee joint with reduced joint space', caption: 'Normal and arthritic knee joint X-rays, reproduced from the supplied presentation.'}], blocks: [
 p('Your knee is where the thigh bone, shin bone and kneecap meet. Cartilage helps the joint surfaces move smoothly.'),
 p('Knee osteoarthritis involves changes in the cartilage, bone and tissues around the joint. These changes can contribute to pain, stiffness and difficulty moving.'),
 p('It is often described as “wear and tear”, but that phrase can make movement sound harmful. Appropriate exercise is an important part of managing the condition.'),
 p('Symptoms differ between people. Some experience occasional discomfort, while others find that knee pain affects walking, work or everyday activities.') ]},
 {heading: 'Common knee osteoarthritis symptoms', blocks: [
 p('Knee osteoarthritis symptoms may include:'),
 ul('Pain with activity, such as walking, climbing stairs, squatting or prolonged standing.', 'Stiffness after rest, including when getting up from a chair or first moving in the morning.', 'Swelling or a feeling of fullness around the knee.', 'Reduced movement, making it harder to bend or straighten the knee comfortably.', 'Reduced confidence, such as walking shorter distances or feeling less steady.'),
 p('Clicking or grinding sensations can occur, but clicking alone does not confirm arthritis.'),
 p('Notice how your symptoms affect daily life. Having to stop during your usual walk or struggling with stairs gives your clinician useful information.') ]},
 {heading: 'How is knee osteoarthritis diagnosed?', blocks: [
 p('Assessment usually starts with your symptoms, previous injuries and the activities you find difficult.'),
 p('Your clinician may examine how you walk, your knee movement, muscle strength, alignment and areas of tenderness.'),
 p('An X-ray is not always necessary. Imaging may be considered when another condition is suspected or the results would help guide care.'),
 p('X-ray changes and pain do not always match. Your symptoms and ability to manage daily activities matter when deciding on treatment.') ]},
 {heading: 'Managing knee osteoarthritis', blocks: [
 p('Knee osteoarthritis treatment usually combines several approaches.'), h('Set practical goals'),
 p('Think about what you want to do more comfortably: walk to the market, manage stairs or stand long enough to prepare a meal.'),
 p('Specific goals help you and your clinician assess whether treatment is making a useful difference.'), h('Build strength and fitness'),
 p('Exercise helps maintain movement and strengthens the muscles supporting the knee. A physiotherapist can tailor a programme to your symptoms, strength and balance.'), h('Consider weight management where appropriate'),
 p('For people living with overweight or obesity, gradual weight loss can reduce the load on the knees and help improve symptoms.'),
 p('Discuss an achievable approach with your healthcare professional. Weight management should support your overall health and ability to stay active.'), h('Pace daily activities'),
 p('If a task repeatedly aggravates your knee, try breaking it into shorter periods with breaks.'),
 p('The aim is to keep moving at a manageable level while allowing recovery when symptoms flare.') ]},
 {heading: 'Exercises for knee osteoarthritis', images: [
 {image: balance.url, imageAlt: 'Illustration of a woman balancing on one leg', caption: 'Balance illustration. Source: dreamstime.com, as credited in the presentation.'},
 {image: walking.url, imageAlt: 'Illustration of two adults walking together', caption: 'Walking illustration. Source: dreamstime.com, as credited in the presentation.'}
 ], blocks: [
 p('The right starting point depends on your current ability. Begin with an amount you can manage and increase gradually.'),
 p('Exercises for knee osteoarthritis may include:'),
 ul('Strengthening exercises for the thigh, hip and calf muscles.', 'Walking, with distance and pace adjusted to your tolerance.', 'Cycling, if comfortable.', 'Swimming or water exercise, which may make movement easier.', 'Balance and flexibility exercises, selected according to your needs.'),
 p('Some discomfort can occur when starting exercise. If pain persists, worsens or comes with significant swelling, adjust the activity and seek advice.'),
 p('A clinician or physiotherapist can help you choose suitable exercises and progress at a manageable pace.') ]},
 {heading: 'Medicines, injections and surgery', blocks: [
 p('Additional treatment may be considered when symptoms interfere with daily activities. The options depend on your health, preferences and response to earlier treatment.'), h('Medicines'),
 p('Topical anti-inflammatory medicines, such as certain gels, may help knee osteoarthritis pain. Oral anti-inflammatory medicines may be considered when suitable.'),
 p('These medicines are not appropriate for everyone. Your doctor or pharmacist can check your medical history and other medicines, particularly if you have stomach, kidney or heart problems.'), h('Knee injections'),
 p('Corticosteroid injections may be considered for short-term symptom relief in selected cases. They may help when symptoms persist despite other treatment or make it difficult to participate in exercise.'),
 p('Other injections, including hyaluronic acid and treatments described as regenerative, should not be assumed to offer the same benefits.'),
 p('Singapore’s Ministry of Health stated in February 2026 that evidence of clinical effectiveness for hyaluronic acid and other regenerative injections was insufficient to support subsidies for knee osteoarthritis.'),
 p('Before proceeding with an injection, ask:'), ul('What benefit can I reasonably expect?', 'How long might relief last?', 'What are the risks and alternatives?', 'What will it cost?'),
 p('Do not assume that an injection cures osteoarthritis or regrows cartilage.'), h('Surgery'),
 p('Surgery may be considered when pain, stiffness or reduced function substantially affects quality of life despite appropriate non-surgical care.'),
 p('An orthopaedic specialist can explain the available options, expected benefits, risks and recovery involved. Surgery is not necessary for everyone with knee osteoarthritis.') ]},
 {heading: 'When to seek medical advice', blocks: [
 p('Arrange an assessment if knee pain keeps returning, worsens or limits your usual activities. Repeated swelling, locking or a feeling that the knee gives way also deserves attention.'),
 p('Seek urgent medical assessment if:'), ul('Your knee is hot and very swollen, particularly with fever.', 'You have severe pain after an injury.', 'You cannot bear weight on the affected leg.'),
 p('A painful, swollen calf with shortness of breath needs emergency medical attention.'),
 p('If you are seeking knee pain treatment in Singapore, a GP can be a starting point for assessment and advice on whether physiotherapy or specialist care is needed.') ]},
 {heading: 'Frequently asked questions', blocks: [
 h('Is all knee pain caused by osteoarthritis?'), p('No. Injuries and other joint or soft-tissue conditions can also cause knee pain. A clinical assessment helps identify the likely cause.'),
 h('Can I exercise with knee osteoarthritis?'), p('Yes. Appropriate strengthening and fitness exercises are important parts of treatment. Start at a manageable level and seek guidance if symptoms make exercise difficult.'),
 h('Do I need an X-ray for knee pain?'), p('Not always. Your clinician will consider your symptoms and examination findings before deciding whether imaging would be useful.'),
 h('Does knee osteoarthritis always require surgery?'), p('No. Treatment often begins with exercise, practical lifestyle measures and suitable pain relief. Surgery may be considered when symptoms substantially affect daily life despite non-surgical care.') ]},
 {heading: 'Get support for persistent knee pain', blocks: [p('A painful knee does not have to mean giving up movement. Understanding your symptoms and finding a manageable treatment plan can help improve comfort, strength and confidence.') ]}
 ],
 cta: {text: ['Persistent knee pain affecting your daily activities?'], button: 'Find Dr Chung here', href: 'https://www.clynicq.com/?clinic=agksee4qjo'},
 disclaimer: 'This article provides general health information and does not replace an individual medical assessment.',
 references: [
 {label: 'HealthHub / Khoo Teck Puat Hospital: Knee Osteoarthritis—Causes and Treatment Options', href: 'https://www.healthhub.sg/health-conditions/knee-osteoarthritis'},
 {label: 'Agency for Care Effectiveness, Ministry of Health: Management of knee osteoarthritis—a joint effort with patients', href: 'https://www.ace-hta.gov.sg/healthcare-professionals/acg/management-of-knee-osteoarthritis---a-joint-effort-with-patients-acg/'},
 {label: 'Ministry of Health: Subsidies available for knee osteoarthritis injectable therapy and approval thresholds for other regenerative injections', href: 'https://www.moh.gov.sg/newsroom/subsidies-available-for-knee-osteoarthritis-injectable-therapy-and-approval-thresholds-for-other-regenerative-injections/'}
 ]
};
