/* =========================================================
 * main.js — VeeDeeO 사이트 공통 스크립트
 * 목표: (1) 대역폭 절약 (2) SEO 안전 (3) 재수정 최소화
 * - 모든 기능은 '존재 검사' 후 동작 (견고성)
 * - 애니메이션/관찰자는 IntersectionObserver 지원 시에만
 * - 사용자가 '감소된 모션' 선호 시 애니메이션 즉시 비활성
 * =======================================================*/

// 0) 안전한 DOM 준비 헬퍼 (defer 로딩 시에도 중복 실행 방지)
(function onReady(fn){
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else { fn(); }
})(function init(){
  // 1) 푸터 연도 자동 갱신 (존재 시에만)
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) 외부 링크 보안/SEO 속성 강제: target=_blank 에 noopener, nofollow(선택)
  //    (검색엔진에 과한 페이지 랭크 누수 방지, 보안 향상)
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.target === "_blank") {
      if (!a.rel) a.rel = "noopener";
      else if (!/noopener/i.test(a.rel)) a.rel += " noopener";
      // 광고/사용자 제작 링크가 많다면 다음 줄 주석 해제해 nofollow 부여:
      // if (!/nofollow/i.test(a.rel)) a.rel += " nofollow";
    }
  }

  // 3) 이미지 대역폭 절약: lazy 속성 강제, 크기 정보가 없으면 간이 placeholder
  //    (HTML에서 처리하는 게 정석이지만, 누락 대비 방어 로직)
  var imgs = document.images || [];
  for (var j = 0; j < imgs.length; j++) {
    var img = imgs[j];
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    // width/height 미지정 시 CLS 방지용 placeholder (가벼운 처리)
    if (!img.getAttribute("width") || !img.getAttribute("height")) {
      // 실제 계산값을 속성으로 고정해 재레이아웃 최소화
      if (img.naturalWidth && img.naturalHeight) {
        img.setAttribute("width", img.naturalWidth);
        img.setAttribute("height", img.naturalHeight);
      }
    }
    // 거대한 이미지가 fold 위에 있다면, 교체/압축 권고 로그(개발자 콘솔용)
    // if (img.naturalWidth > 2000 || img.naturalHeight > 1500) {
    //   console.warn("[ImgSize]", img.src, "is quite large. Consider WebP/compression.");
    // }
  }

  // 4) 스크롤 이벤트 최적화: 필요 시에만, 그리고 수동 등록 지양
  //    (여기서는 전역 스크롤 핸들러 자체를 두지 않음 = 대역폭과 무관하지만 CPU 절약)

  // 5) IntersectionObserver 기반 ‘보이는 순간 class 추가’ (SEO 안전)
  //    - JS 미동작 시에도 콘텐츠는 기본 표시됨(숨김 금지!)
  var prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canObserve = ("IntersectionObserver" in window) && !prefersReduce;

  if (canObserve) {
    var lazyReveal = document.querySelectorAll("[data-reveal]");
    if (lazyReveal.length) {
      var io = new IntersectionObserver(function(entries, obs){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // once: true
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
      for (var k = 0; k < lazyReveal.length; k++) io.observe(lazyReveal[k]);
    }
  } else {
    // 폴백: JS 비활성/감소된 모션 환경에서도 즉시 표시
    var all = document.querySelectorAll("[data-reveal]");
    for (var m = 0; m < all.length; m++) all[m].classList.add("is-visible");
  }

  // 6) 한 번 본 애니메이션은 세션 동안 반복 금지(불필요한 재연출 방지)
  try {
    if (sessionStorage) {
      if (!sessionStorage.getItem("vd_animated_once")) {
        sessionStorage.setItem("vd_animated_once", "1");
      } else {
        document.documentElement.classList.add("vd-anim-disabled");
      }
    }
  } catch(e){ /* storage 차단 환경 무시 */ }

  // 7) 불필요한 프리로드/프리패치 제거(HTML에서 진행 요망) — JS 레벨에서는 건드리지 않음.
});
