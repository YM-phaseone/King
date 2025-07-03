
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = navMenu.querySelectorAll('a');

  // ── ハンバーガーメニューの開閉処理 ──
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // メニューを開いたときは背景スクロールを止め、閉じたら戻す
    if (navMenu.classList.contains('active')) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  });

  // 各リンクをクリックしたらメニューを閉じる（背景スクロールも戻す）
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // ── スクロール検知系の jQuery 部分 ──
  // （必要に応じてそちらとも競合しないよう、同じDOMContentLoaded相当で処理されます） 
  var threshold = 200;

  // ページ読み込み直後にすでに閾値を超えているかチェック
  if ($(window).scrollTop() > threshold) {
    $(".logo-img").addClass("hidden");
    $(".logo-text").addClass("visible");
    $("#header").addClass("transparent");
  }

  // スクロールイベントで常にチェック
  $(window).on("scroll", function() {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > threshold) {
      $(".logo-img").addClass("hidden");
      $(".logo-text").addClass("visible");
      $("#header").addClass("transparent");
    } else {
      $(".logo-img").removeClass("hidden");
      $(".logo-text").removeClass("visible");
      $("#header").removeClass("transparent");
    }
  });

  // ── ページトップボタンの「下からスライドイン／スライドアウト」切り替え ──
  var showFlag = false;
  var topBtn = $('#page-top');

  // 初期位置を画面外下（bottom:-100px）に設定
  topBtn.css('bottom', '-100px');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 150) {
      if (!showFlag) {
        showFlag = true;
        // スクロールが 150px を超えたらボタンを下からスライドイン
        topBtn.stop().animate({ bottom: '20px' }, 200);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        // スクロールが 150px 未満になったらボタンを下へスライドアウト
        topBtn.stop().animate({ bottom: '-100px' }, 200);
      }
    }
  });

  // ボタンクリックでページトップへスクロール（800ms）
  topBtn.on('click', function () {
    $('body,html').animate({ scrollTop: 0 }, 800);
    return false;
  });

  // ── 下線アニメーション（スクロール連動） ──
  function animateUnderlineOnScroll() {
    var scrollTop    = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.about__title, .menu__title, .news-title, .access__title').each(function() {
      var $el         = $(this);
      var elOffsetTop = $el.offset().top;
      var elHeight    = $el.outerHeight();

      var distFromBottom = (scrollTop + windowHeight) - elOffsetTop;
      var distFromTop    = (elOffsetTop + elHeight) - scrollTop;
      var fullDistance   = windowHeight + elHeight;

      var inViewDist = Math.min(distFromBottom, distFromTop);
      var progress   = inViewDist / fullDistance;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      $el.get(0).style.setProperty('--underline-progress', progress);
    });
  }

  animateUnderlineOnScroll();
  $(window).on('scroll', animateUnderlineOnScroll);
});

