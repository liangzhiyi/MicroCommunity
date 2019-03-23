(function(vc){
      vc.extends({
        data:{
            registerInfo:{
                username:'',
                passwd:'',
                repasswd:'',
                errorInfo:''
            }
        },
        _initMethod:function(){

        },
        _initEvent:function(){
             vc.component.$on('errorInfoEvent',function(_errorInfo){
                    vc.component.loginInfo.errorInfo = _errorInfo;
                    console.log('errorInfoEvent 事件被监听',_errorInfo)
                });

             vc.component.$on('validate_code_component_param_change_event',function(params){
                         for(var tmpAttr in params){
                             vc.component.loginInfo[tmpAttr] = params[tmpAttr];
                         }
                         console.log('errorInfoEvent 事件被监听',params)
                     });
        },
        methods:{
            doRegister(){
                vc.http.post(
                            'register',
                            'doRegister',
                            JSON.stringify(vc.component.registerInfo),
                            {
                                emulateJSON:true
                             },
                             function(json,res){
                                //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                if(res.status == 200){
                                    vc.jumpToPage("/");
                                    return ;
                                }
                                vc.component.registerInfo.errorInfo = json;
                             },
                             function(errInfo,error){
                                console.log('请求失败处理');

                                vc.component.registerInfo.errorInfo = errInfo;
                             });

            }
        }
    });


})(window.vc);