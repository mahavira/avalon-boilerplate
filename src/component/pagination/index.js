
require("./style.css");
avalon.component('ms-newpager', {
    template: require('./temp.html'),
    defaults: {
        getHref: function (href) {
            return '#page-' + this.toPage(href)
        },
        getTitle: function (title) {
            return title
        },
        rpage : /(?:#|\?)page\-(\d+)/,
        showPages: 5,
        pages: [],
        totalPages: 15,
        currentPage: 1,
        firstText: '首页',
        prevText: '上一页',
        nextText: '下一页',
        lastText: '尾页',
        onPageClick: avalon.noop,//让用户重写
        cbProxy: function (e, p) {
            if (this.$buttons[p] || p === this.currentPage) {
                e.preventDefault()
                return //disabled, active不会触发
            }
            var cur = this.toPage(p)
            var obj = getPages.call(this, cur)
            this.pages = obj.pages
            this.currentPage = obj.currentPage
            return this.onPageClick(e, p)
        }, 
        onInit: function (e) {
            var cur = this.currentPage
            var match = /(?:#|\?)page\-(\d+)/.exec(location.href)

            if (match && match[1]) {
                var cur = ~~match[1]
                if (cur < 0 || cur > this.totalPages) {
                    cur = 1
                }
            }
            var obj = getPages.call(this, cur)
            this.pages = obj.pages
            this.currentPage = obj.currentPage
        },
        toPage: function (p) {
            var cur = this.currentPage
            var max = this.totalPages
            switch (p) {
                case 'first':
                    return 1
                case 'prev':
                    return Math.max(cur - 1, 0)
                case 'next':
                    return Math.min(cur + 1, max)
                case 'last':
                    return max
                default:
                    return p
            }
        },
         isDisabled: function (name, page) {
            return this.$buttons[name] = (this.currentPage === page)
         }
    }
})
function getPages(currentPage) {
    var pages = []
    var s = this.showPages
    var total = this.totalPages
    var half = Math.floor(s / 2)
    var start = currentPage - half + 1 - s % 2
    var end = currentPage + half

    // handle boundary case
    if (start <= 0) {
        start = 1;
        end = s;
    }
    if (end > total) {
        start = total - s + 1
        end = total
    }

    var itPage = start;
    while (itPage <= end) {
        pages.push(itPage)
        itPage++
    }

    return {currentPage: currentPage, pages: pages};
}