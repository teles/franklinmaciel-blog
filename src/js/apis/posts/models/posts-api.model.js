(function(){

    angular.module('frontpress.apis.posts').factory('PostsApi', PostsApi);

    PostsApi.$inject = ['AjaxModel', '$Frontpress'];

    function PostsApi(AjaxModel, $Frontpress){
        var postsBaseUrl = $Frontpress.restApiUrl + '/posts/';
        
        var restApi = {
            getAllPosts: getAllPosts,
            getPostBySlug: getPostBySlug
        };

        return restApi;

        function _parseConfigsToParams(configs){
            var params = {};

            if(configs){
                if(configs.pageSize) params.number = parseInt(configs.pageSize);
                if(configs.pageNumber) params.page = parseInt(configs.pageNumber);
                if(configs.context) params.context = configs.context;
                if(configs.fields) params.fields = configs.fields;
            }
            return params;
        }

        function getAllPosts(configs){
            var postsListUrl = postsBaseUrl;
            var params = _parseConfigsToParams(configs);
            return AjaxModel.get(postsListUrl, params);
        }

        function getPostBySlug(postSlug, configs){             
            var postUrl = postsBaseUrl + 'slug:<post-slug>';
            postUrl = postUrl.replace('<post-slug>', postSlug);
            return AjaxModel.get(postUrl, configs);
        }
    }

})();
