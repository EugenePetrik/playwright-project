export const LIGHTHOUSE_DESKTOP_LINKS: {
  testName: string;
  url: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  isMobile: boolean;
  reportName: string;
}[] = [
  {
    testName: 'Home page',
    url: '/',
    performance: 75,
    accessibility: 70,
    bestPractices: 85,
    seo: 65,
    isMobile: false,
    reportName: 'home-page',
  },
  {
    testName: 'Login page',
    url: '/login',
    performance: 90,
    accessibility: 85,
    bestPractices: 85,
    seo: 85,
    isMobile: false,
    reportName: 'login-page',
  },
  {
    testName: 'Register page',
    url: '/register',
    performance: 90,
    accessibility: 85,
    bestPractices: 85,
    seo: 85,
    isMobile: false,
    reportName: 'register-page',
  },
];
