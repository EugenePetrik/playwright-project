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
    performance: 50,
    accessibility: 50,
    bestPractices: 50,
    seo: 50,
    isMobile: true,
    reportName: 'home-page',
  },
  {
    testName: 'Login page',
    url: '/login',
    performance: 50,
    accessibility: 50,
    bestPractices: 50,
    seo: 50,
    isMobile: true,
    reportName: 'login-page',
  },
  {
    testName: 'Register page',
    url: '/register',
    performance: 50,
    accessibility: 50,
    bestPractices: 50,
    seo: 50,
    isMobile: true,
    reportName: 'register-page',
  },
];
