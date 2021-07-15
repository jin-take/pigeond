//section 1
//APIを利用する際のURLになります
var KEY = 'AIzaSyDIt7HKk6QqeF5-HNsdM1QdxaPu5o9ZnzQ'
var url = 'https://vision.googleapis.com/v1/images:annotate?key='
var api_url = url + KEY

//section 2
// カメラ
window.onload = () => {
const video  = document.querySelector("#camera_video");
const canvas = document.querySelector("#picture");
//const se     = document.querySelector('#se');
canvas.style.display ="none";



const constraints = {
    audio: false,
    video: {
        width: 300,
        height: 200,
        facingMode: "user"   // フロントカメラを利用する
        // facingMode: { exact: "environment" }  // リアカメラを利用する場合
    }
};

//カメラを<video>と同期
navigator.mediaDevices.getUserMedia(constraints)
.then( (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
        video.play();
    };
})
.catch( (err) => {
    console.log(err.name + ": " + err.message);
});

// シャッターボタン 
document.querySelector("#shutter").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    var imgData = ctx.createImageData(canvas.width, canvas.height);
    // 演出的な目的で一度映像を止めてSEを再生する
    video.pause();  // 映像を停止
    //se.play();      // シャッター音
    setTimeout( () => {
        video.play();    // 0.5秒後にカメラ再開
    }, 500);
        // canvasに画像を貼り付ける
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        data = canvas.toDataURL("image/jpeg");  
        getImageInfo2(data);
    });
};

//section 3
//ページを読み込む際に動的にラベル検出結果表示用のテーブルを作成
$(function(){
    for (var i =0; i < 10; i++){
        $("#resultBox").append("<tr><td class='resultTableContent'></td></tr>")
    }
})

//section 4
//画像がキャンバスに映った時点で呼び出される処理
//getImageInfo(evt);
//clear();
//$(".resultArea").removeClass("hidden")

//section 5
//画像ファイルを読み込み、APIを利用するためのURLを組み立てる
function getImageInfo(evt){
    var file = evt.target.files;
    var reader = new FileReader();
    var dataUrl = "";
    reader.readAsDataURL(file[0]);
    reader.onload = function(){
        dataUrl = reader.result;
        $("#showPic").html("<img src='" + dataUrl + "'>");
        makeRequest(dataUrl,getAPIInfo);
    }
}

function getImageInfo2(data){
    $("#showPic").html("<img src='" + data + "'>");
    makeRequest(data,getAPIInfo);
}

//section 6
//APIへのリクエストに組み込むJsonの組み立て
function makeRequest(dataUrl,callback){
    var end = dataUrl.indexOf(",")
    var request = "{'requests': [{'image': {'content': '" + dataUrl.slice(end + 1) + "'},'features': [{'type': 'LABEL_DETECTION','maxResults': 10,},{'type': 'FACE_DETECTION',},{'type':'TEXT_DETECTION','maxResults': 20,}]}]}"
    callback(request)
}

//section 7
//通信を行う
function getAPIInfo(request){
    $.ajax({
        url : api_url,
        type : 'POST',       
        async : true,        
        cashe : false,
        data: request, 
        dataType : 'json', 
        contentType: 'application/json',   
    }).done(function(result){
        showResult(result);
    }).fail(function(result){
        alert('failed to load the info');
    });  
}

//section 8
//得られた結果を画面に表示する
function showResult(result){
    //表情分析の結果の表示
    if(result.responses[0].faceAnnotations){
        //この変数に、表情のlikelihoodの値を配列として保持する
        var facialExpression = [];
        facialExpression.push(result.responses[0].faceAnnotations[0].joyLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].sorrowLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].angerLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].surpriseLikelihood);
        facialExpression.push(result.responses[0].faceAnnotations[0].headwearLikelihood);
        for (var k = 0; k < facialExpression.length; k++){
            if (facialExpression[k] == 'UNKNOWN'){
                facialExpression[k] = 0;
            }else if (facialExpression[k] == 'VERY_UNLIKELY'){
                facialExpression[k] = 2;
            }else if (facialExpression[k] == 'UNLIKELY'){
                facialExpression[k] = 4;
            }else if (facialExpression[k] == 'POSSIBLE'){
                facialExpression[k] = 6;
            }else if (facialExpression[k] == 'LIKELY'){
                facialExpression[k] = 8;
            }else if (facialExpression[k] == 'VERY_LIKELY'){
                facialExpression[k] = 10;
            }
        }

        let max = facialExpression[0];
        var index = 0;
        for (var k = 1; k < facialExpression.length; k++){
            if (facialExpression[k] > max){
                max = facialExpression[k];
                index = k;
            }
        }
        if(max <= 4){
            index = 5;
        }

        //video.style.display ="none";

        //この配列の中身が返り値（emo[0], emo[1],,,）
        const emo = ['joy', 'sorrow', 'anger', 'surprise','headwear','No expression'];
        // $("#textBox").append(emo[index])　// 消す
        if(index === 0){
            var img = document.getElementById('demo').innerHTML = '<img src="emotionimg/joy.jpeg">';
        }else if(index === 1){
            var img = document.getElementById('demo').innerHTML = '<img src="./emotionimg/sorrow.jpeg">';
        }else if(index === 2){
            var img = document.getElementById('demo').innerHTML = '<img src="./emotionimg/anger.jpg">';
        }else if(index === 3){
            var img = document.getElementById('demo').innerHTML = '<img src="./emotionimg/suprise.jpeg">';
        }else if(index === 4){
            var img = document.getElementById('demo').innerHTML = '<img src="./emotionimg/headwear.jpg">';
        }else if(index === 5){
            var img = document.getElementById('demo').innerHTML = '<img src="./emotionimg/Noex.png">';
        }
    }
}