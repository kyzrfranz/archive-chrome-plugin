
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "archive_page_en",
        title: "archive this page",
        type: 'normal',
        contexts: ['selection']
    });
});


// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((item, tab) => {
    const urlToArchive = item.linkUrl || tab.url;
    console.log(urlToArchive)
    const submitId = Math.random().toString(36).substring(2, 32);  // You can change this to something more specific if needed
    const archiveUrl = `https://archive.ph/submit/?submitid=${submitId}&url=${encodeURIComponent(urlToArchive)}`;
    chrome.tabs.create({ url: archiveUrl }, (newTab) => {
        // Optionally, wait for the page to load and then retrieve the archived link from the response
        console.log('Submitted URL for archiving:', archiveUrl);
    });
});

