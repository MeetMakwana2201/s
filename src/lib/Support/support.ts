// lib/static-pages.ts

// export async function getSupportSlug(slug: string) {
//     const aboutus = {
//         slug: "about-us",
//         title: "About Us",
//         content: `
//       <p>Welcome to our platform! We are committed to providing you with the best experience possible.</p>
//       <p>Our mission is to empower creators and builders like you to do amazing things.</p>
//     `,
//     }

//     const privacypolicy = {
//         slug: "privacy-policy",
//         title: "Privacy Policy",
//         content: `
//       <p>Your privacy is important to us. We collect minimal data and ensure it's stored securely.</p>
//       <p>We never sell your information to third parties. Period.</p>
//     `,
//     }

//     const termsandconditions =
//     {
//         slug: "terms-and-conditions",
//         title: "Terms and Conditions",
//         content: `
//       <p>By using our platform, you agree to our terms and conditions. Be respectful, be kind.</p>
//       <p>We reserve the right to modify these terms at any time with proper notice.</p>
//     `,
//     }

//     return slug === 'off-duty-fit-set' ? sample : null;
// }
// lib/static-pages.ts

type StaticPage = {
    slug: string;
    title: string;
    content: string;
};

const staticPages: Record<string, StaticPage> = {
    "about-us": {
        slug: "about-us",
        title: "About Us",
        content: `
      <p>Welcome to our platform! We are committed to providing you with the best experience possible.</p>
      <p>Our mission is to empower creators and builders like you to do amazing things.</p>
    `,
    },
    "privacy-policy": {
        slug: "privacy-policy",
        title: "Privacy Policy",
        content: `
      <p>Your privacy is important to us. We collect minimal data and ensure it's stored securely.</p>
      <p>We never sell your information to third parties. Period.</p>
    `,
    },
    "terms-and-conditions": {
        slug: "terms-and-conditions",
        title: "Terms and Conditions",
        content: `
      <p>By using our platform, you agree to our terms and conditions. Be respectful, be kind.</p>
      <p>We reserve the right to modify these terms at any time with proper notice.</p>
    `,
    },
};

export async function getSupportSlug(slug: string): Promise<StaticPage | null> {
    return staticPages[slug] ?? null;
}
