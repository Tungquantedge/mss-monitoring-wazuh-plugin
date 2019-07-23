import expect from '@kbn/expect';

export default function({ getService, getPageObjects }) {
  const browser = getService('browser');
  const PageObjects = getPageObjects([ 'common', 'api' ]);
  const popOver = getService('popOver');
  const testSubjects = getService('testSubjects');


  describe('welcome', () => {

    before(async function () {
      await PageObjects.common.navigateToApp('wazuh');
      await PageObjects.common.waitUntilUrlIncludes('tab=welcome');
    });

    it('complete test check and load overview', async () => {
      expect(await browser.getCurrentUrl()).to.contain('tab=welcome');
    });

    it('should be marked the switch of `Amazon AWS` extension when clicking this', async () => {
      const result = await popOver.checkedPopover('switchAws', 'eyePopoverSecurity');
      expect(result).to.be.ok();
    });

    it('should be enabled the `Amazon AWS` extension', async () => {
      expect(testSubjects.exists('overviewWelcomeAws')).to.be.ok();
    });

    it('after reload the browser the `Amazon AWS` extension should be enabled', async () => {
      browser.refresh();
      expect(testSubjects.exists('overviewWelcomeAws')).to.be.ok();
    });

    it('should be marked the switch of `OpenSCAP` extension when clicking this', async () => {
      const result = await popOver.checkedPopover('switchOscap', 'eyePopoverAuditing');
      expect(result).to.be.ok();
    });

    it('should be enabled the `OpenSCAP` extension', async () => {
      expect(testSubjects.exists('overviewWelcomeOscap')).to.be.ok();
    });

    it('after reload the browser the `OpenSCAP` extension should be enabled', async () => {
      browser.refresh();
      expect(testSubjects.exists('overviewWelcomeOscap')).to.be.ok();
    });

    it('should be marked the switch of `CIS-CAT` extension when clicking this', async () => {
      const result = await popOver.checkedPopover('switchCiscat', 'eyePopoverAuditing');
      expect(result).to.be.ok();
    });

    it('should be enabled the `CIS-CAT` extension', async () => {
      expect(testSubjects.exists('overviewWelcomeCiscat')).to.be.ok();
    });

    it('after reload the browser the `CIS-CAT` extension should be enabled', async () => {
      browser.refresh();
      expect(testSubjects.exists('overviewWelcomeCiscat')).to.be.ok();
    });

    it('should be marked the switch of `VirusTotal` extension when clicking this', async () => {
      const result = await popOver.checkedPopover('switchVirustotal', 'eyePopoverThreat');
      expect(result).to.be.ok();
    });

    it('should be enabled the `VirusTotal` extension', async () => {
      expect(testSubjects.exists('overviewWelcomeVirustotal')).to.be.ok();
    });

    it('after reload the browser the `VirusTotal` extension should be enabled', async () => {
      browser.refresh();
      expect(testSubjects.exists('overviewWelcomeVirustotal')).to.be.ok();
    });

    it('should be marked the switch of `Osquery` extension when clicking this', async () => {
      const result = await popOver.checkedPopover('switchOsquery', 'eyePopoverThreat');
      expect(result).to.be.ok();
    });

    it('should be enabled the `Osquery` extension', async () => {
      expect(testSubjects.exists('overviewWelcomeOsquery')).to.be.ok();
    });

    it('after reload the browser the `Osquery` extension should be enabled', async () => {
      browser.refresh();
      expect(testSubjects.exists('overviewWelcomeOsquery')).to.be.ok();
    });

    it('should be marked the switch of `Docker listener` extension when clicking this', async () => {
      const result = await popOver.checkedPopover('switchDocker', 'eyePopoverThreat');
      expect(result).to.be.ok();
    });

    it('should be enabled the `Docker listener` extension', async () => {
      expect(testSubjects.exists('overviewWelcomeDocker')).to.be.ok();
    });

    it('after reload the browser the `Docker listener` extension should be enabled', async () => {
      browser.refresh();
      expect(testSubjects.exists('overviewWelcomeDocker')).to.be.ok();
    });

    it('no extension should not be enabled when change the api', async () => {
      await PageObjects.api.insertNewApi();
      expect(await testSubjects.exists('overviewWelcomeAws')).to.not.be.ok();
      expect(await testSubjects.exists('overviewWelcomeOscap')).to.not.be.ok();
      expect(await testSubjects.exists('overviewWelcomeCiscat')).to.not.be.ok();
      expect(await testSubjects.exists('overviewWelcomeVirustotal')).to.not.be.ok();
      expect(await testSubjects.exists('overviewWelcomeOsquery')).to.not.be.ok();
      expect(await testSubjects.exists('overviewWelcomeDocker')).to.not.be.ok();
    });

    it('all extension should be enabled when return to the last api', async () => {
      await PageObjects.api.deleteNewApi();
      while(!await testSubjects.exists('overviewWelcomeAws')){}
      expect(true).to.be.ok();
      while(!await testSubjects.exists('overviewWelcomeOscap')){}
      expect(true).to.be.ok();
      while(!await testSubjects.exists('overviewWelcomeCiscat')){}
      expect(true).to.be.ok();
      while(!await testSubjects.exists('overviewWelcomeVirustotal')){}
      expect(true).to.be.ok();
      while(!await testSubjects.exists('overviewWelcomeOsquery')){}
      expect(true).to.be.ok();
      while(!await testSubjects.exists('overviewWelcomeDocker')){}
      expect(true).to.be.ok();
    });

  });
}