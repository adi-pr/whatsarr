import onGrab from "./onGrab";
import onSeriesAdd from "./onSeriesAdd";
import onSeriesDelete from "./onSeriesDelete";
import onTest from "./onTest";

export const handlers = {
    "Test": onTest,
    "Grab": onGrab,
    "SeriesAdd": onSeriesAdd,
    "SeriesDelete": onSeriesDelete,
};