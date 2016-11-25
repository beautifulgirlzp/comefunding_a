/*
 * @Author: asdfasd
 * @Date:   2016-06-28 16:29:58
 * @Last Modified by:   asdfasd
 * @Last Modified time: 2016-07-11 14:55:51
 */

//下面用于图片上传预览功能
function setImagePreview(inputId, imgId, boxId, width1, height1, width2, height2) {
    var docObj = document.getElementById(inputId);
    var imgObjPreview = document.getElementById(imgId);


    // var img = null;
    // img = document.createElement("img");
    // document.body.insertAdjacentElement("beforeEnd", img); // firefox不行
    // // img.style.opacity = "hidden";
    // img.src = docObj.value;
    // console.log(img);
    // var imgwidth = img.offsetWidth;
    // var imgheight = img.offsetHeight;

    // alert(imgwidth + "," + imgheight);

    // if(imgwidth != width2 || imgheight != height2) {
    //     alert("图的尺寸应该是" + width2 + "x"+ height2);
    //     docObj.value = "";
    //     return false;
    // }


    if (docObj.files && docObj.files[0]) {
        //火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = width1 + "px";
        imgObjPreview.style.height = height1 + "px";
        //imgObjPreview.src = docObj.files[0].getAsDataURL();

        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    } else {
        //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById(boxId);
        //必须设置初始大小
        localImagId.style.width = width1 + "px";
        localImagId.style.height = height1 + "px";
        //图片异常的捕捉，防止用户修改后缀来伪造图片
        try {
            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    if (docObj.value == "") {
        alert("请上传图片");
        return false;
    } else if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(docObj.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
        docObj.value = "";
        return false;
    }
    var p = imgObjPreview.parentNode.getElementsByTagName("p")[0];
    p.innerText = " ";
    return true;
}

$(function() {

    // 下拉菜单切换值
    $(".dropdown-menu>li>a").click(function() {
        $(this).parents("ul").siblings(".select").html($(this).html());
    })

    //点击下一步
    $(".nextStep").click(function() {
        var index = $(this).index(".nextStep");
        var statu = nextStep();
        if (statu == false) {
            return;
        } else {

            $(".box").eq(index + 1).show().siblings(".box").hide();

            $(".creat-project>span>ul>li").eq(index + 1).addClass("active").siblings().removeClass("active");
            if (index == 2) {
                console.log(1);
                var statu2 = lastStep();
                console.log(statu2);
                if (statu2 == false) {
                    return;
                } else {
                    location.href = "success.html";
                }

                location.href = "success.html";
            }
        }
    })

    //点击上一步
    $(".before").click(function() {
        $(window).scrollTop(0);
        var index = $(this).index(".before");
        if (index >= 1) {
            $(".box").eq(index - 1).show().siblings(".box").hide();
            $(".creat-project>span>ul>li").eq(index - 1).addClass("active").siblings().removeClass("active");
        } else {
            return false;
        }
    })

    //模态框数据提交
    $(".modal-submit").click(function() {
        var supportMoney = $("#supportMoney").val();
        var limitNum = $("#limitNum").val();
        var repayTime = $("#repayTime").val();
        var repayCon = $("#repayCon").val();
        var repayDesc = $("#repayDesc").val();
        var pic3 = $("#doc3").val();

        if (!supportMoney) {
            $.common.showMsg("supportMoneyError", "支持金额不能为空");
            return false;
        } else {
            $("#supportMoneyError").hide();
        }
        if (!limitNum) {
            $.common.showMsg("limitNumError", "限定人数不能为空");
            return false;
        } else {
            $("#limitNumError").hide();
        }
        if (!repayTime) {
            $.common.showMsg("repayTimeError", "回报时间不能为空");
            return false;
        } else {
            $("#repayTimeError").hide();
        }
        if (!repayCon) {
            $.common.showMsg("repayConError", "回报内容不能为空");
            return false;
        } else {
            $("#repayConError").hide();
        }
        if (!repayDesc) {
            $.common.showMsg("repayDescError", "回报描述不能为空");
            return false;
        } else if (repayDesc.length > 256) {
            $.common.showMsg("repayDescError", "回报描述不能超过256个字");
            return false;
        } else {
            $("#repayDescError").hide();
        }
        if (!pic3) {
            $.common.showToast("请上传图片", 1000);
            return false;
        }


        $(this).attr('data-dismiss', 'modal');
        var html = '';
        html += '<div class="cont pos-rlt" >';
        html += '<div class="edit">';
        html += '<div class="text f-l">';
        html += '<i>￥' + supportMoney + '</i>';
        html += '<p class="mg-r-20">限定人数：' + limitNum + '</p>';
        html += '</div>';
        html += '<div class="icon f-r">';
        html += '<img src="../img/edit.png" data-toggle="modal" data-target="#myModal2" alt="">';
        html += '<p data-toggle="modal" data-target="#myModal2">编辑</p>';
        html += '<img src="../img/delete.png" onclick=del(event) alt="">';
        html += '<p onclick=del(event)>删除</p>';
        html += '</div>';
        html += '</div>';
        html += '<div class="bottom">';
        html += '<p>' + repayCon + '</p>';
        html += '<p>' + repayDesc + '</p>';
        html += '<img src="../img/list_img.png" alt="">';
        html += '</div>';
        html += '</div>';
        console.log(html);
        $(".other").before(html);
        if ($('.cont').length > 0) {
            $('.message').css('display', 'none');
        } else {
            $('.message').css('display', 'block');
        }

    })

    //添加时清空原有内容
    $(".other .add").click(function() {
        $("#supportMoney").val('');
        $("#limitNum").val('');
        $("#repayTime").val('');
        $("#repayCon").val('');
        $("#repayDesc").val('');
        $("#doc3").val('');
        console.log($(".cont").eq($(".cont").length - 1).children('.mess').length);
        if ($(".cont").eq($(".cont").length - 1).children('.mess').length > 0) {
            $(".mess").remove();
        }
    })




})

function nextStep() {
    $(window).scrollTop(0);
    var name = $("#projectName").val();
    var money = $("#money").val();
    var companyName = $("#companyName").val();
    var personName = $("#personName").val();
    var telNum = $("#telNum").val();
    var pic1 = $("#doc1").val();
    console.log(pic1);
    var pic2 = $("#doc2").val();
    var agree = $("#checkbox-1").is(":checked");



    // if (!name) {
    //     $.common.showMsg("projectError", "项目名称不能为空");
    //     return false;
    // }
    // else if(name.length>15){
    //     $.common.showMsg("projectError", "项目名称不能超过15个字");
    //     return false;
    // }
    // else {
    //     $("#projectError").hide();
    // }
    // if (!money) {
    //     $.common.showMsg("moneyError", "目标金额不能为空");
    //     return false;
    // } else {
    //     $("#moneyError").hide();
    // }
    // if (!companyName) {
    //     $.common.showMsg("companyError", "公司名称不能为空");
    //     return false;
    // }
    // else if (companyName.length>128) {
    //      $.common.showMsg("companyError", "公司名称不能超过128个字");
    //     return false;
    // }
    // else {
    //     $("#companyError").hide();
    // }
    // if (!personName) {
    //     $.common.showMsg("personError", "联系人不能为空");
    //     return false;
    // } else {
    //     $("#personError").hide();
    // }
    // if (!telNum) {
    //     $.common.showMsg("telError", "手机号不能为空");
    //     return false;
    // }
    // else if(telNum.length>11){
    //      $.common.showMsg("telError", "请输入正确的手机号");
    //     return false;
    // }
    // else {
    //     $("#telError").hide();
    // }
    // if (!pic1) {
    //     $.common.showToast("请上传图片",1000);
    //     return false;
    // }
    // if (!pic2) {
    //     $.common.showToast("请上传图片",1000);
    //     return false;
    // }
    // if (agree == false) {

    //     $.common.showToast("请阅读并同意协议",1000);
    //     return false;
    // }
}

function lastStep() {
    if ($(".cont").length < 3) {
        console.log(1);

        $(".cont").eq($(".cont").length - 1)
            .append('<div class="mess pos-abt">请设置至少 3 档与项目有直接关联的回报。</div>');
        return false;
    }
}

function del(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    $(obj).attr({ 'data-toggle':'modal','data-target':'#myModal3' });

    $("#myModal3 .confirm").click(function() {
        $(obj).parents('.cont').remove();
        if ($('.cont').length > 0) {
            $('.message').css('display', 'none');
        } else {
            $('.message').css('display', 'block');
        }
    })

}

function edit() {

}
