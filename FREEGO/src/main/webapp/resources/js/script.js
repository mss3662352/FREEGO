var lnBtn = 1;
$(document).ready(function() {
	
	var callPath = '${member.profile_photo}';
	console.log(callPath);

	// User
	$(".user-info-txt").click(function() {
		$(".user-detail-box").toggleClass('on');
	})
	$(".user-detail-box").mouseleave(function() {
		$(this).toggleClass('on');
	})

	// :::::::::::::::::::::::::: input 입력시 자동 넘기기
	$('.num').keyup(function() {
		var charLimit = $(this).attr("maxlength");
		console.log(charLimit);
		if (this.value.length >= charLimit) {
			console.log(this.value.length);
			$(this).next().next().next('.num').focus();
			return false;
		}
	});

	tab('#tab', 0);
	tab2('#tab2', 0);
	modal1();
	modal2();
	modal3();
	modal4();
	modal5();
	modal6();
	filebox();

	// 신청서 작성 SELECT 박스
	var btn = 0;
	$(".aplctform-box").click(function() {
		/* $(".application-box").show(); */
		if (btn == 0) {
			$(".application-box").show();
			btn = 1;
		} else if (btn == 1) {
			$(".application-box").hide();
			btn = 0;
		}
	});
	$(".application-cancel").click(function() {
		$(".application-box").hide();
	});

	// :::::::::::::::::::::lnb 스크립트
	$(".menubar").click(function() {
		expandContract();
	})
});

function expandContract() { // 확장, 축소
	if (lnBtn == 1) {// lnb메뉴가 닫혔있을때
		$(".lnb-wrap").css("width", "65px");
		$(".lnb-menu").css("display", "none");
		$(".lnb-menu2").css("display", "block");
		$(".lnb-profile").css("display", "none");
		$(".lnb-top-cont").css("padding", "14px 14px 23px 23px");
		$(".lnb-top-cont h1").css("display", "none");
		$(".sub-container-wrap").css("width", "calc(100% - 65px)");
		$(".footer-wrap").css("width", "calc(100% - 65px)");
		lnBtn = 0;
	} else if (lnBtn == 0) {
		$(".lnb-wrap").css("width", "240px");
		$(".lnb-menu").css("display", "block");
		$(".lnb-menu2").css("display", "none");
		$(".lnb-profile").css("display", "block");
		$(".lnb-top-cont h1").css("display", "block");
		$(".lnb-top-cont").css("padding", "14px 14px 13px 14px");
		$(".sub-container-wrap").css("width", "calc(100% - 240px)");
		$(".footer-wrap").css("width", "calc(100% - 240px)");
		lnBtn = 1;
	}
	$('.lnb-footer').toggleClass('hide');
	$('#contract-logo').toggleClass('hide');
}

// :::::::::::::::::::::::::: LNB Menu
(function($) {
	var lnbUI = {
		click : function(target, speed) {
			var _self = this, $target = $(target);
			_self.speed = speed || 300;
			// alert(_self);
			$target.each(function() {
				if (findChildren($(this))) {
					return;
				}
			});
			function findChildren(obj) {
				return obj.find('> ul').length > 0;
			}
			$target
					.on('click', 'a',
							function(e) {
								e.stopPropagation();
								var $this = $(this), $depthTarget = $this
										.next(), $siblings = $this.parent()
										.siblings();

								$this.parent('li').find('ul li').removeClass(
										'on');
								$siblings.removeClass('on');
								$siblings.find('ul').slideUp(250);

								if ($depthTarget.css('display') == 'none') {
									_self.activeOn($this);
									$depthTarget.slideDown(_self.speed);
								} else {
									$depthTarget.slideUp(_self.speed);
									_self.activeOff($this);
								}
							});

		},
		activeOff : function($target) {
			$target.parent().removeClass('on');
		},
		activeOn : function($target) {
			$target.parent().addClass('on');
		}
	}
	$(function() {
		lnbUI.click('.lnb-menu li', 300);
	});
}(jQuery));

function tab(e, num) {
	// alert("지금은 테스트 중입니다.");
	console.log(num);
	var num = num || 0;
	console.log(num);
	var menu = $(e).children();
	var con = $(".tab-cont-wrap").children();
	var select = $(menu).eq(num);
	var i = num;

}

function tab2(e, num) {
	// alert("지금은 테스트 중입니다.");
	var num = num || 0;
	var menu = $(e).children();
	var con = $(".tab2-cont-wrap").children();
	var select = $(menu).eq(num);
	var i = num;

	select.addClass('on');
	con.eq(num).show();

	menu.click(function() {
		if (select !== null) {
			select.removeClass("on");
			con.eq(i).hide();
		}

		select = $(this);
		i = $(this).index();

		select.addClass('on');
		con.eq(i).show();
	});
}

// :::::::::::::::::::::::::: Modal Popup
function modal1() {
	$('.pw-change').click(function() {
		$('#pwModal').show();
		return false;
	});
	$('.btn-close').click(function() {
		$('#pwModal').hide();
		return false;
	});
	$('.btn-popup-cancel').click(function() {
		$('#pwModal').hide();
		return false;
	});
}

function modal2() {
	$('.exprt-search').click(function() {
		$('#exprtModal').show();
		return false;
	});
	$('.btn-close').click(function() {
		$('#exprtModal').hide();
		return false;
	});
	$('.btn-popup-cancel').click(function() {
		$('#exprtModal').hide();
		return false;
	});
}

function modal3() {
	$('.btn-info-change').click(function() {
		$('#perinfoModal').show();
		return false;
	});
	$('.btn-close').click(function() {
		$('#perinfoModal').hide();
		return false;
	});
	$('.btn-popup-cancel').click(function() {
		$('#perinfoModal').hide();
		return false;
	});
}

function modal4() {
	$('.btn-carinfo-change').click(function() {
		$('#carinfoModal').show();
		return false;
	});
	$('.btn-close').click(function() {
		$('#carinfoModal').hide();
		return false;
	});
	$('.btn-popup-cancel').click(function() {
		$('#carinfoModal').hide();
		return false;
	});
}

function modal5() {
	$('.btn-eduinfo-change').click(function() {
		$('#eduinfoModal').show();
		return false;
	});
	$('.btn-close').click(function() {
		$('#eduinfoModal').hide();
		return false;
	});
	$('.btn-popup-cancel').click(function() {
		$('#eduinfoModal').hide();
		return false;
	});
}

function modal6() {
	$('.btn-newemply').click(function() {
		$('#newacModal').show();
		return false;
	});
	$('.btn-close').click(function() {
		$('#newacModal').hide();
		return false;
	});
	$('.btn-popup-cancel').click(function() {
		$('#newacModal').hide();
		return false;
	});

}


// ::::::::::::::::::::::::::휴가기간 DAY 날짜계산 스크립트
function call() {
	var sdd = document.getElementById("regDate1").value;
	var edd = document.getElementById("regDate2").value;
	var ar1 = sdd.split('-');
	var ar2 = edd.split('-');

	var n_year1 = parseInt(Number(ar1[0]));
	var n_month1 = parseInt(Number(ar1[1]));
	var n_day1 = parseInt(Number(ar1[2]));

	var n_year2 = parseInt(Number(ar2[0]));
	var n_month2 = parseInt(Number(ar2[1]));
	var n_day2 = parseInt(Number(ar2[2]));

	var da1 = new Date(n_year1, n_month1, n_day1);
	var da2 = new Date(n_year2, n_month2, n_day2);
	var dif = da2 - da1;
	var cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
	var result = parseInt(dif / cDay) + 1;
	if (sdd && edd) {
		document.getElementById('days').value = String(result) + "일";
	}

	// sdd 날짜가 edd 보다 높을 경우 error창을 띄우고 날짜, 휴가합계값 초기화 스크립트
	if (da1 > da2) {
		document.getElementById('regDate1').value = new Date().toISOString()
				.substring();
		document.getElementById('regDate2').value = new Date().toISOString()
				.substring();
		document.getElementById('days').value = String(0);
		alert("값이 올바르지 않습니다. 날짜를 다시 선택 해주세요.");
	}
}

// :::::::::::::::::::::::::: preview images
function filebox() {

	var fileTarget = $('.file-box .career-upload-hd');

	fileTarget.on('change', function() { // 값이 변경되면
		if (window.FileReader) { // modern browser
			var filename = $(this)[0].files[0].name;
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만
			// 추출
		}
		// 추출한 파일명 삽입
		$(this).siblings('.career-upload-nm').val(filename);
	});
	
	var fileTarget1 = $('.file-box .edu-upload-hd');

	fileTarget1.on('change', function() { // 값이 변경되면
		if (window.FileReader) { // modern browser
			var filename = $(this)[0].files[0].name;
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만
			// 추출
		}
		// 추출한 파일명 삽입
		$(this).siblings('.edu-upload-nm').val(filename);
	});
	
	var fileTarget2 = $('.license-upload-hd');

	fileTarget2.on('change', function() { // 값이 변경되면
		if (window.FileReader) { // modern browser
			var filename = $(this)[0].files[0].name;
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만
			// 추출
		}
		// 추출한 파일명 삽입
		$(this).siblings('.license-upload-nm').val(filename);
	});


	var imgTarget = $('.upload-hd');

	imgTarget
			.on(
					'change',
					function() {
						var imgBox = $('.preview-img');
						imgBox.children('.upload-display').remove();

						if (window.FileReader) {
							// image 파일만
							if (!$(this)[0].files[0].type.match(/image\//))
								return;

							var reader = new FileReader();
							reader.onload = function(e) {
								var src = e.target.result;
								imgBox
										.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'
												+ src
												+ '" class="upload-thumb"></div></div>');
							}
							reader.readAsDataURL($(this)[0].files[0]);
						} else {
							$(this)[0].select();
							$(this)[0].blur();
							var imgSrc = document.selection.createRange().text;
							imgBox
									.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');

							var img = $(this).siblings('.upload-display').find(
									'img');
							img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""
									+ imgSrc + "\")";
						}
					});

}

// :::::::::::::::::::::::::: 시스템관리 > 사용자현황 테이블 사번순, 이름 가나다순 정렬 스크립트
// 테이블 재 세팅
var table_html;

function re_table(line, cols, table_position) {
	table_html = "";
	for (var i = 0; i < line; i++) {
		table_html += "<tr>";
		for (var j = 0; j < cols; j++) {
			table_html += "<td>" + new_array[i][j] + "</td>";
		}
		table_html += "</tr>";
	}
	$(table_position.find("tbody")).html(table_html);
}

// 정렬
$(document)
		.ready(
				function() {
					var text_array;

					$("a.btn-up1, a.btn-down1")
							.on(
									"click",
									function() {
										var $this = $(this);
										var $this_table = $this
												.parents("table");
										var $this_start_number = $this.parent()
												.index();

										var table_th_length = $this.parents(
												"table").find("thead th").length; // 테이블
										// 칸의
										// 갯수
										var table_tr_length = $this.parents(
												"table").find("tbody tr").length; // 테이블
										// 내용 줄
										// 갯수

										new_array = new Array();
										for (var i = 0; i < table_tr_length; i++) {
											new_array[i] = [];
											for (var j = 0; j < table_th_length; j++) {
												text_array = $this_table.find(
														"tbody tr").eq(i).find(
														"td").eq(j).text(); // 값땡겨오는거
												new_array[i][j] = text_array;
											}
										}

										// 테이블 클래스 active 지정
										$this_table.find("th a").removeClass(
												"active");
										$this.addClass("active");

										/* 정렬 */
										new_array
												.sort(function(a, b) {
													if ($this
															.hasClass("btn-up1")) {
														return a[$this_start_number] < b[$this_start_number] ? -1
																: a[$this_start_number] > b[$this_start_number] ? 1
																		: 0;
													} else {
														return a[$this_start_number] > b[$this_start_number] ? -1
																: a[$this_start_number] < b[$this_start_number] ? 1
																		: 0;
													}
												});

										// 값이 들어오는지 확인 소스
										// console.log(new_array);

										$this_table.find("tbody").empty();
										re_table(table_tr_length,
												table_th_length, $this_table);
									});

					// 이름 가나다순 정렬 스크립트
					var text_array;

					$("a.btn-up2, a.btn-down2")
							.on(
									"click",
									function() {
										var $this = $(this);
										var $this_table = $this
												.parents("table");
										var $this_start_number = $this.parent()
												.index();

										var table_th_length = $this.parents(
												"table").find("thead th").length; // 테이블
										// 칸의
										// 갯수
										var table_tr_length = $this.parents(
												"table").find("tbody tr").length; // 테이블
										// 내용 줄
										// 갯수

										new_array = new Array();
										for (var i = 0; i < table_tr_length; i++) {
											new_array[i] = [];
											for (var j = 0; j < table_th_length; j++) {
												text_array = $this_table.find(
														"tbody tr").eq(i).find(
														"td").eq(j).text(); // 값땡겨오는거
												new_array[i][j] = text_array;
											}
										}

										// 테이블 클래스 active 지정
										$this_table.find("th a").removeClass(
												"active");
										$this.addClass("active");

										/* 정렬 */
										new_array
												.sort(function(a, b) {
													if ($this
															.hasClass("btn-up2")) {
														return a[$this_start_number] < b[$this_start_number] ? -1
																: a[$this_start_number] > b[$this_start_number] ? 1
																		: 0;
													} else {
														return a[$this_start_number] > b[$this_start_number] ? -1
																: a[$this_start_number] < b[$this_start_number] ? 1
																		: 0;
													}
												});

										// 값이 들어오는지 확인 소스
										// console.log(new_array);

										$this_table.find("tbody").empty();
										re_table(table_tr_length,
												table_th_length, $this_table);
									});

					/* 오름차순 버튼 누를때마다 아이콘 변경 */
					$("a.btn-up1").click(function() {
						$("a.btn-up1").addClass("ico-change");
						$("a.btn-down1").addClass("ico-change1");
					})
					$("a.btn-down1").click(function() {
						$("a.btn-up1").removeClass("ico-change");
						$("a.btn-down1").removeClass("ico-change1");
					})

					$("a.btn-up2").click(function() {
						$("a.btn-up2").addClass("ico-change");
						$("a.btn-down2").addClass("ico-change2");
					})
					$("a.btn-down2").click(function() {
						$("a.btn-up2").removeClass("ico-change");
						$("a.btn-down2").removeClass("ico-change2");
					})
				})
