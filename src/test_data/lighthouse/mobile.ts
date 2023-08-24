export const LIGHTHOUSE_MOBILE_LINKS: {
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
    accessibility: 65,
    bestPractices: 80,
    seo: 60,
    isMobile: true,
    reportName: 'home-page',
  },
  {
    testName: 'Login page',
    url: '/login',
    performance: 90,
    accessibility: 85,
    bestPractices: 80,
    seo: 80,
    isMobile: true,
    reportName: 'login-page',
  },
  {
    testName: 'Register page',
    url: '/register',
    performance: 90,
    accessibility: 85,
    bestPractices: 80,
    seo: 80,
    isMobile: true,
    reportName: 'register-page',
  },
];
