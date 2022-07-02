/*
部分接口需要先登录才能使用:
      给手机发送验证码
      /captcha/sent?phone=1312863xxxx
      通过手机号和验证码登录
      /login/cellphone?phone=1312863xxxx&captcha=xxxx
*/
const api='http://118.195.248.21:3000';

var app = new Vue({
  el: "#player",
  data:{
    // 查询关键字
    query:"",
    // 歌曲数组
    musicList:[],
    // 歌曲地址
    musicUrl:"",
    // 歌曲封面
    musicCover:"",
    // 歌曲评论
    hotComments:[],
    // 动画播放状态
    isPlaying:false,
    // 遮罩层的显示状态
    isShow:false,
    // mv地址
    mvUrl:""

  },
  methods:{ 
    // 搜索音乐
    searchMusic:function(){
      var that=this;
      axios.get(api+'/search?keywords='+this.query)
      .then(function(response){
        that.musicList=response.data.result.songs;  // 获取到的数据赋值进数组
        console.log(that.musicList);
      },function(err){
        console.log(err);
      })
    },
    // 播放音乐
    playMusic:function(musicId){
      var that=this;
      console.log(musicId);

      // 获取音乐地址
      axios.get(api+'/song/url?id='+musicId)
      .then(function(response){
        // console.log("获取音乐地址")
        // console.log(response.data.data[0].url);
        that.musicUrl=response.data.data[0].url;
      },function(err){
        console.log(err);
      })
      // 歌曲详情获取
      axios.get(api+"/song/detail?ids="+musicId)
      .then(function(response){
        // console.log(response);
        that.musicCover=response.data.songs[0].al.picUrl;
      },function(err){console.log(err)})
      // 歌曲评论获取
      axios.get(api+'/comment/hot?id='+musicId+'&&type=0')
      .then(function(response){
        // console.log(response.data.hotComments);
        that.hotComments=response.data.hotComments;
      },function(err){
        console.log(err);
      })
    },
    // 点击播放
    play:function(){
      console.log("play");
      this.isPlaying=true;
    },
    // 点击暂停
    pause:function(){
      console.log("pause");
      this.isPlaying=false;
    },
    // 播放MV
    playMV:function(mvid){
      var that=this;
      axios.get(api+'/mv/url?id='+mvid)
      .then(function(response){
        console.log(response);
        that.mvUrl=response.data.data.url;
        that.isShow=true;
      },function(err){
        console.log(err);
      })
    },
    // 隐藏MV
    hide:function(){
      this.isShow=false;
    }
  }
});
