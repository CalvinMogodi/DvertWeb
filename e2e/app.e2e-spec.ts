import { DvertWebPage } from './app.po';

describe('dvert-web App', function() {
  let page: DvertWebPage;

  beforeEach(() => {
    page = new DvertWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
