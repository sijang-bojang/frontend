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
    </style>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      kakao.maps.load(function () {
        var container = document.getElementById('map');
        var options = { center: new kakao.maps.LatLng(${lat}, ${lng}), level: 3 };
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(${lat}, ${lng}); 
        var marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
      });
    </script>
  </body>
</html>`;
