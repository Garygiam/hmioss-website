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
  fallbackPanelLabel?: string;
};

export const newsItems: NewsItem[] = [
  {
    category: "News",
    title: "Opening Ceremony Marks HMIOSS Launch",
    summary:
      "HMIOSS officially announced its establishment in Malaysia, with its founding chairman highlighting the institute's mission to strengthen members through continuous learning, professional development, and meaningful national contribution. The institute will focus on academic exchange, talent training, economic cooperation, technology development, medical research, and strategic public dialogue.",
    href: "https://www.sinchew.com.my/news/20260526/nation/7536965",
    linkLabel: "Read coverage",
    fallbackPanelLabel: "HMIOSS",
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
