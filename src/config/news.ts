export type NewsImage = {
  src: string;
  alt: string;
  variant: "primary" | "supporting";
};

export type NewsItem = {
  category: string;
  title: string;
  summary: string;
  href?: string;
  linkLabel?: string;
  images?: NewsImage[];
};

export const newsItems: NewsItem[] = [
  {
    category: "News",
    title: "Opening Ceremony Marks HMIOSS Launch",
    summary:
      "HMIOSS officially announced its establishment in Malaysia, with its founding chairman highlighting the institute's mission to strengthen members through continuous learning, professional development, and meaningful national contribution. The institute will focus on academic exchange, talent training, economic cooperation, technology development, medical research, and strategic public dialogue.",
    href: "https://www.sinchew.com.my/news/20260526/nation/7536965",
    linkLabel: "Read coverage",
    images: [
      {
        src: "https://cdn.sinchew.com.my/wp-content/uploads/2026/05/e69687e5918aefbc9ae6b4aae997a8e7ad96e795a5e7a094e7a9b6e999a2.jpg",
        alt: "Guests officiate the HMIOSS opening ceremony",
        variant: "primary",
      },
    ],
  },
  {
    category: "Announcements",
    title: "Recruitment Drive",
    summary: "Details will be published soon.",
  },
  {
    category: "Events",
    title: "Delegation Visit",
    summary: "Details will be published soon.",
  },
];
