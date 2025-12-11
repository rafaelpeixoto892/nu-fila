"use strict";
jQuery(document).ready(function ($) {
    console.log("cookie js");
    function writeCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3);
            var expires = "; expires=" + date.toGMTString();
        } else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function remove(name) {
        document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    function getCookieValue(a) {
        var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }
    function updateBarHeight() {
        if ($(".overlay-cookie .options .itens .submit").position()) {
            var submitPosRelativeToOptions = $(".overlay-cookie .options .itens .submit").position().top,
                topOptionPosRelativeToOptions = $(".overlay-cookie .options .itens .level").first().position().top;
            $(".overlay-cookie #bar").css({ height: submitPosRelativeToOptions - topOptionPosRelativeToOptions + 23 });
        }
    }
    function updateBulletPositionAndBlueHeight(position, level) {
        $("#bar").attr("class", level), $("#bar." + level + " .bullet").offset({ top: position }), $("#bar." + level + " .bullet").css({ top: position + "px !important" });
        var bulletPositionRelativeToP = $("#bar." + level + " .bullet").position().top,
            height = $(".overlay-cookie #bar").outerHeight(!0) - bulletPositionRelativeToP;
        $("head").append("<style>#bar." + level + ":before{height:" + height + "px !important}</style>"), $(".bar").addClass(level);
    }
    function defaultBulletPosAndBlueHeight() {
        var currentLevel = getCookieValue("blog-accept-cookie-level") || "opt3";
        updateBulletPositionAndBlueHeight($(".overlay-cookie .options .itens").find("[data-level='".concat(currentLevel, "']")).find("h3").offset().top, currentLevel);
    }
    function CookieSettings(control) {
        
        "show" == control &&
            $(".overlay-cookie").fadeIn(function () {
                $(".overlay-cookie").fadeIn(), updateBarHeight(), defaultBulletPosAndBlueHeight(), getCookieValue("blog-accept-cookie-level");
            }),
            "hide" == control &&
                $(".overlay-cookie").fadeOut(function () {
                    $(".overlay-cookie").fadeOut();
                });
    }
    $(".settings_cookie").on("click", function (e) {
        CookieSettings("show"), $(".cookies").remove(), e.preventDefault();
    }),
        $(".close_cookies_setting,.settings_ok").on("click", function (e) {
            CookieSettings("hide"), e.preventDefault();
        }),
        $(".accept_cookie").on("click", function (e) {
            writeCookie("blog-accept-cookie", "blog-accept-cookie", 30), $(".cookies").fadeOut().remove(), e.preventDefault();
        }),
        "" != getCookieValue("blog-accept-cookie") ? CookieSettings("hide") : $(".cookies").fadeIn(),
        $("#bar").on("click", function (event) {
            event.preventDefault();
            var clickedPosition = event.pageY,
                levelsPosOnScreen = [];
            $(".level h3").each(function () {
                levelsPosOnScreen.push({ position: $(this).offset().top, currentLevel: $(this).parent().data("blog-accept-cookie-level") });
            });
            var clickedDistancesToLevels = [];
            levelsPosOnScreen.forEach(function (level, index) {
                var clickedPosRelativeToLevels = clickedPosition - level.position;
                clickedPosRelativeToLevels < 0 && (clickedPosRelativeToLevels *= -1), clickedDistancesToLevels.push(parseInt(clickedPosRelativeToLevels, 10));
            });
            var minPosition = Math.min.apply(Math, clickedDistancesToLevels),
                indexOfMin = clickedDistancesToLevels.indexOf(minPosition),
                posToSelect = levelsPosOnScreen[indexOfMin];
            updateBulletPositionAndBlueHeight(posToSelect.position, posToSelect.currentLevel), remove("blog-accept-cookie-level"), writeCookie("blog-accept-cookie-level", posToSelect.currentLevel, 30);
        }),
        $(window).resize(function () {
            updateBarHeight(), defaultBulletPosAndBlueHeight();
        }),
        updateBarHeight(),
        $(".level h3").on("click", function (e) {
                var position = $(this).offset().top,
                //level = $(this).parent().data("blog-accept-cookie-level");
                level = e.currentTarget.parentNode.dataset.level
                if(level){
                    updateBulletPositionAndBlueHeight(position, level), remove("blog-accept-cookie-level"), writeCookie("blog-accept-cookie-level", level, 30), e.preventDefault();
                }
        });
});
