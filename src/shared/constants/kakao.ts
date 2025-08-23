import Constants from "expo-constants";

// 우선순위: EXPO_PUBLIC_ 환경변수 > app config extra > 빈값
export const KAKAO_APP_KEY =
  (process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY as string | undefined) ||
  ((Constants.expoConfig?.extra as any)?.KAKAO_JAVASCRIPT_KEY as
    | string
    | undefined) ||
  "";

export const KAKAO_MAP_HTML = (lat: number, lng: number) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
      .marker-label { padding: 6px 10px; background: #111827; color: #fff; border-radius: 12px; font-size: 12px; }
      .spot-marker { background: #FF6B6B; border-radius: 50%; width: 20px; height: 20px; border: 3px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
      .market-marker { background: #4ECDC4; border-radius: 50%; width: 16px; height: 16px; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    </style>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false"></script>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      kakao.maps.load(function () {
        var container = document.getElementById('map');
        var options = { center: new kakao.maps.LatLng(${lat}, ${lng}), level: 3 };
        var map = new kakao.maps.Map(container, options);
        var markerPosition = new kakao.maps.LatLng(${lat}, ${lng}); 
        var marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
        
        // 검색 서비스 초기화
        var ps = new kakao.maps.services.Places();
        
        // 스팟 마커들을 저장할 배열
        window.spotMarkers = [];
        // 코스 스팟 마커들을 저장할 배열
        window.courseSpotMarkers = [];
        // 코스 경로 폴리라인을 저장할 변수
        window.coursePolyline = null;
        
        // 코스 스팟 색상 정의
        var courseSpotColors = {
          green: '#10B981',
          blue: '#3B82F6',
          red: '#EF4444',
          orange: '#F59E0B',
          purple: '#8B5CF6'
        };
        
        // 코스 스팟 마커 표시 함수
        window.showCourseSpots = function(spots) {
          // 기존 코스 스팟 마커들 제거
          if (window.courseSpotMarkers) {
            window.courseSpotMarkers.forEach(function(marker) {
              marker.setMap(null);
            });
          }
          window.courseSpotMarkers = [];
          
          // 기존 코스 경로 라인 제거
          if (window.coursePolyline) {
            window.coursePolyline.setMap(null);
            window.coursePolyline = null;
          }
          
          // 새로운 코스 스팟 마커들 추가 (순서 없이)
          spots.forEach(function(spot, index) {
            var position = new kakao.maps.LatLng(spot.latitude, spot.longitude);
            
            var marker = new kakao.maps.Marker({
              position: position,
              map: map
            });
            
            // 코스 스팟용 커스텀 마커 이미지 (진행중인 코스임을 명확하게 표시)
            var markerImage = new kakao.maps.MarkerImage(
              'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="' + (courseSpotColors[spot.color] || '#10B981') + '" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="' + (courseSpotColors[spot.color] || '#10B981') + '" stroke="#fff" stroke-width="1"/></svg>'),
              new kakao.maps.Size(24, 24)
            );
            marker.setImage(markerImage);
            
            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', function() {
              // 코스 스팟 정보를 React Native로 전송
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'spot_clicked',
                spot: spot
              }));
            });
            
            // 마커에 호버 효과 추가
            kakao.maps.event.addListener(marker, 'mouseover', function() {
              marker.setZIndex(1000);
              // 마커 크기 확대 및 강조 효과
              marker.setImage(new kakao.maps.MarkerImage(
                'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="' + (courseSpotColors[spot.color] || '#10B981') + '" stroke="#fff" stroke-width="3"/><circle cx="12" cy="12" r="8" fill="' + (courseSpotColors[spot.color] || '#10B981') + '" stroke="#fff" stroke-width="2"/></svg>'),
                new kakao.maps.Size(28, 28)
              ));
            });
            
            kakao.maps.event.addListener(marker, 'mouseout', function() {
              marker.setZIndex(1);
              // 마커 크기 원래대로
              marker.setImage(markerImage);
            });
            
            window.courseSpotMarkers.push(marker);
          });
        };
        
        // 스팟 마커 표시 함수
        window.showSpots = function(spots) {
          // 기존 스팟 마커들 제거
          if (window.spotMarkers) {
            window.spotMarkers.forEach(function(marker) {
              marker.setMap(null);
            });
          }
          window.spotMarkers = [];
          
          // 새로운 스팟 마커들 추가
          spots.forEach(function(spot) {
            var marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(spot.latitude, spot.longitude),
              map: map
            });
            
            // 커스텀 마커 이미지 설정 (스팟용)
            var markerImage = new kakao.maps.MarkerImage(
              'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FF6B6B" stroke="#fff" stroke-width="2"/></svg>'),
              new kakao.maps.Size(24, 24)
            );
            marker.setImage(markerImage);
            
            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', function() {
              // 스팟 정보를 React Native로 전송
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'spot_clicked',
                spot: spot
              }));
            });
            
            window.spotMarkers.push(marker);
          });
        };
        
        // React Native와 통신을 위한 함수
        window.searchPlace = function(keyword) {
          ps.keywordSearch(keyword, function(data, status) {
            if (status === kakao.maps.services.Status.OK) {
              // 검색 결과를 React Native로 전송
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'search_result',
                data: data
              }));
              
              // 기존 마커들 제거
              if (window.searchMarkers) {
                window.searchMarkers.forEach(function(marker) {
                  marker.setMap(null);
                });
              }
              window.searchMarkers = [];
              
              // 검색 결과를 지도에 표시
              var bounds = new kakao.maps.LatLngBounds();
              data.forEach(function(item) {
                var marker = new kakao.maps.Marker({
                  position: new kakao.maps.LatLng(item.y, item.x)
                });
                marker.setMap(map);
                window.searchMarkers.push(marker);
                bounds.extend(new kakao.maps.LatLng(item.y, item.x));
              });
              
              // 지도를 검색 결과 영역으로 이동
              if (data.length > 0) {
                map.setBounds(bounds);
              }
            } else {
              // 검색 결과가 없을 때
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'search_no_result',
                message: '검색 결과가 없습니다.'
              }));
            }
          });
        };
        
        // 지도 이동 함수
        window.moveToLocation = function(lat, lng) {
          var newPosition = new kakao.maps.LatLng(lat, lng);
          map.setCenter(newPosition);
          map.setLevel(3);
          
          // 기존 마커 제거
          if (window.currentMarker) {
            window.currentMarker.setMap(null);
          }
          
          // 새로운 마커 추가
          window.currentMarker = new kakao.maps.Marker({
            position: newPosition
          });
          window.currentMarker.setMap(map);
        };
        
        // 스팟 위치로 이동하고 확대하는 함수
        window.showSpotOnMap = function(spot) {
          var position = new kakao.maps.LatLng(spot.latitude, spot.longitude);
          
          // 지도를 해당 위치로 이동
          map.setCenter(position);
          
          // 적절한 줌 레벨로 확대 (레벨 2는 상당히 확대된 상태)
          map.setLevel(2);
          
          // 기존 마커들은 그대로 유지 (새로운 마커 추가하지 않음)
        };
        
        // 여러 스팟을 포함하도록 지도 범위 조정
        window.fitBoundsToSpots = function(spots) {
          if (spots.length === 0) return;
          
          var bounds = new kakao.maps.LatLngBounds();
          spots.forEach(function(spot) {
            bounds.extend(new kakao.maps.LatLng(spot.latitude, spot.longitude));
          });
          
          // 모든 스팟이 보이도록 지도 범위 설정
          map.setBounds(bounds);
          
          // 너무 확대되지 않도록 최대 레벨 제한
          setTimeout(function() {
            if (map.getLevel() < 1) {
              map.setLevel(1);
            }
          }, 100);
        };
        
        // 모든 마커 제거
        window.clearAllMarkers = function() {
          // 스팟 마커들 제거
          if (window.spotMarkers) {
            window.spotMarkers.forEach(function(marker) {
              marker.setMap(null);
            });
            window.spotMarkers = [];
          }
          
          // 코스 스팟 마커들 제거
          if (window.courseSpotMarkers) {
            window.courseSpotMarkers.forEach(function(marker) {
              marker.setMap(null);
            });
            window.courseSpotMarkers = [];
          }
          
          // 코스 경로 라인 제거
          if (window.coursePolyline) {
            window.coursePolyline.setMap(null);
            window.coursePolyline = null;
          }
          
          // 검색 마커들 제거
          if (window.searchMarkers) {
            window.searchMarkers.forEach(function(marker) {
              marker.setMap(null);
            });
            window.searchMarkers = [];
          }
          
          // 현재 마커 제거
          if (window.currentMarker) {
            window.currentMarker.setMap(null);
            window.currentMarker = null;
          }
        };
        
        // React Native에서 메시지 수신
        window.addEventListener('message', function(event) {
          try {
            var data = JSON.parse(event.data);
            if (data.type === 'move_to_location') {
              window.moveToLocation(data.lat, data.lng);
            } else if (data.type === 'show_spots') {
              window.showSpots(data.spots);
            } else if (data.type === 'show_course_spots') {
              window.showCourseSpots(data.spots);
            } else if (data.type === 'fit_bounds_to_spots') {
              window.fitBoundsToSpots(data.spots);
            } else if (data.type === 'clear_all_markers') {
              window.clearAllMarkers();
            } else if (data.type === 'show_spot_on_map') {
              window.showSpotOnMap(data.spot);
            }
          } catch (error) {
            console.error('메시지 파싱 오류:', error);
          }
        });
      });
    </script>
  </body>
</html>`;
