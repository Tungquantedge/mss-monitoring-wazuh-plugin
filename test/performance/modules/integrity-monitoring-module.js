const { WAIT_TIMEOUT, SERVER_URL } = require('../common/constants');
const logger = require('../common/logger');

module.exports = async function (context, commands) {
  // Navigate to a URL, but do not measure the URL
  await commands.navigate(SERVER_URL);

  try {
    // Start collecting metrics
    
    // Click on Kibana menu to access Wazuh App link
    await commands.wait.bySelector('button[data-test-subj="toggleNavButton"]', WAIT_TIMEOUT)
    await commands.click.bySelector('button[data-test-subj="toggleNavButton"]')
    await commands.wait.bySelector('a[href$="/app/wazuh"]', WAIT_TIMEOUT)
    await commands.click.bySelector('a[href$="/app/wazuh"]')
    
    //Wait for an Wazuh home page component to be loaded
    await commands.wait.byXpath('//*[contains(@class,"euiTitle euiTitle--small euiCard__title")]//*[contains(text(),"Security events")]', WAIT_TIMEOUT)

    // Click on Integrity Monitoring module button
    await commands.wait.byXpath('//*[contains(@class,"euiTitle euiTitle--small euiCard__title")]//*[contains(text(),"Integrity monitoring")]', WAIT_TIMEOUT)
    //Waiting for full load of the page
    await commands.wait.byCondition("!isNaN(parseInt(document.querySelector('.statWithLink').innerHTML))", WAIT_TIMEOUT)
    // Start collecting metrics
    await commands.measure.start('Integrity Monitoring module -dashboard')
    logger('--- Initiate measures in dashboard module ---');
    await commands.click.byXpath('//*[contains(@class,"euiTitle euiTitle--small euiCard__title")]//*[contains(text(),"Integrity monitoring")]')
    
    // Search TOP 5 agent chart
    logger('--- TOP 5 agents ---');
    await commands.wait.bySelector('[id="Wazuh-App-Overview-FIM-Top-5-agents-pie"] [data-render-complete="true"][data-test-subj="visualizationLoader"]', WAIT_TIMEOUT)
    // Search Alert by severity chart
    logger('Alerts by action over time');
    await commands.wait.bySelector('[data-render-complete="true"][data-title="Alerts by action over time"]', WAIT_TIMEOUT)
    // Search Alert by Event summary chart
    logger('Events summary');
    await commands.wait.bySelector('[data-render-complete="true"][data-title="Events summary"]', WAIT_TIMEOUT)
    // Search Alert by Event summary chart chart
    logger('Rule distribution');
    await commands.wait.bySelector('[data-render-complete="true"][data-title="Top 5 rules"]', WAIT_TIMEOUT)
    // Search Common actions chart
    logger('Actions');
    await commands.wait.bySelector('[data-render-complete="true"][data-title="Common actions"]', WAIT_TIMEOUT)
    // Search Top 5 users chart
    logger('Top 5 users');
    await commands.wait.bySelector('[data-render-complete="true"][data-title="Top users"]', WAIT_TIMEOUT)

    logger('--- Finish measures ---', 'info');
    
    // Stop and collect the metrics
    return commands.measure.stop();
  } catch (e) {
    // We try/catch so we will catch if the the input fields can't be found
    // The error is automatically logged in Browsertime an rethrown here
    // We could have an alternative flow ...
    // else we can just let it cascade since it caught later on and reported in
    // the HTML
    throw e;
  }
};