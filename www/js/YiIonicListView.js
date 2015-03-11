angular.module('YiIonicListView', ['ionic'])
  .factory('Info', function($http, $ionicLoading){
    var Info = AV.Object.extend('Info', {
    }, {
      getCount: function() {
        var query = new AV.Query(Info);
        return query.count();
      },
      getFeeds: function(page, row) {
        $ionicLoading.show({
          template: '载入中...'
        });

        var query = new AV.Query(Info);
        query.skip(page * row);
        query.limit(row);
        var collection = query.collection();

        return collection.fetch().then(function(res) {
          $ionicLoading.hide();
          return res;
        });
      }
    });

    return Info;
  })

  .controller('yiIonicListViewCtrl', function($scope, $timeout, $ionicLoading, Info) {
    var page = 0;
    var row = 7;
    var count = 10;

    Info.getCount().then(function(res) {
      count = res;
    });

    $scope.doRefresh = function() {
      page = 0;
      row = 7;
      $scope.noMoreItemsAvailable = false;
      $scope.items = undefined;

      Info.getFeeds(page, row).then(function(res) {
        $scope.items = res;

        $scope.$broadcast('scroll.refreshComplete');
      })
    };

    $scope.noMoreItemsAvailable = false;

    $scope.loadMore = function() {
      Info.getFeeds(page, row).then(function(res) {
        page++;
        if ($scope.items) {
          try {
            $scope.items.add(res.models);
          } catch (ex) {}
        } else {
          $scope.items = res;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
      if ( row * page > count) {
        $scope.noMoreItemsAvailable = true;
      }
    };
  });