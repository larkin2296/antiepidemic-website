import router from './router'

router.beforeEach(async(to, from, next) => {
    if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
        next({ path: '/pc' })
    }
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        next({ path: '/mobile' })
    }
})

router.afterEach(() => {
  // finish progress bar
})
