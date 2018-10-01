export function customTabs() {

    let tabContent = document.getElementsByClassName('tab-content');
    let tab = document.getElementsByClassName('tab');
    let initActiveTab = 0;
    hideTabsContent();
    showTabsContent(initActiveTab);

    function hideTabsContent() {
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
            tab[i].classList.remove('active');
        }
    }

    document.getElementById('tabs').addEventListener('click', function (event) {
        let target = event.target;
        if (target.className === 'tab') {
            for (let i = 0; i < tab.length; i++) {
                if (target === tab[i]) {
                    showTabsContent (i);
                    break;
                }
            }
        }
    });


    function showTabsContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            hideTabsContent();
            tab[b].classList.add('active');
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

}