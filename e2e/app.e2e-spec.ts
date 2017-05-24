import { NespressoMapPage } from './app.po';

describe('nespresso-map App', () => {
  let page: NespressoMapPage;

  beforeEach(() => {
    page = new NespressoMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
