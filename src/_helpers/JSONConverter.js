    export function dateJSONConverter(media, type) {
      if (type === "movie") {
          return media.release_date;
        } else {
          return media.first_air_date;
        }
      }
      export function titleJSONConverter(media, type) {
        if (type === "movie") {
            return media.title;
          } else {
            return media.name;
          }
      }

