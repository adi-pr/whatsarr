import onGrab from "./onGrab";
import onSeriesAdd from "./onSeriesAdd";
import onSeriesDelete from "./onSeriesDelete";
import onTest from "./onTest";
import onHealth from "./onHealth";
import onManualInteractionReq from "./onManualInteractionReq";

const sonarrHandlers = {
    "Test": onTest,
    "Grab": onGrab,
    "SeriesAdd": onSeriesAdd,
    "SeriesDelete": onSeriesDelete,
    "Health": onHealth,
    "HealthRestored": onHealth,
    "ManualInteractionRequired": onManualInteractionReq
};

export default sonarrHandlers;
