/* =========================================================
 * aos.js — AOS 초기화 래퍼
 * - AOS 미로딩 시에도 오류 없이 폴백
 * - 사용자 '감소된 모션' 선호 시 비활성
 * - 한 번만 재생(once:true)로 대역폭/CPU浪費 방지
 * =======================================================*/
(function(){
  var prefersReduce = false;
  try {
    prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch(e){}

  // 모바일/저사양에서 무력화 (선호에 따라 조정)
  var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  function initAOS(){
    if (prefersReduce || isMobile) return; // 애니메이션 비활성(접근성/성능)
    if (window.AOS && typeof window.AOS.init === "function") {
      window.AOS.init({
        once: true,           // 한 번만
        duration: 500,        // 짧게
        easing: "ease-out",
        offset: 80,
        anchorPlacement: "top-bottom",
        // mirror:false // 필요 시 스크롤 업 재실행 금지
      });
    }
  }

  // AOS 스크립트가 늦게 로드되어도 안전
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initAOS, 0);
  } else {
    document.addEventListener("DOMContentLoaded", initAOS, { once: true });
  }
})();
