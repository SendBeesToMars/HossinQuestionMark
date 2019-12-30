
table_div = document.getElementById("table_div");

table_contents = "<table><tr><th>Server</th><th>Server ID</th><th>Population</th><th>Hossin Viability</th></tr>";

base_URL = "http://census.daybreakgames.com";
service_ID = "/s:freeongtaxi";
request_type = "/get";
PS2_API_version = "/ps2:v2";
DGC_request_URL_base = base_URL + service_ID + request_type +  PS2_API_version;

fisu_pop_URL = "https://ps2.fisu.pw/api/population";
fisu_terry_URL = "https://ps2.fisu.pw/api/territory";

servers_URL =  DGC_request_URL_base + "/world/?c:limit=100";
server_info_URL = fisu_pop_URL + "/?world=1,10,13,17,19,40";

let CORS_bypass = "https://secret-ocean-49799.herokuapp.com/";

let url_miller = fisu_terry_URL + "/?world=" + "10" + "&continent=4";


function build_table(){
    getServers(CORS_bypass + servers_URL, CORS_bypass + server_info_URL)
    .then(([servers, server_info]) =>{

        console.log("wtf is this bullshit");
        servers = servers.world_list;
        
        // servers.forEach(server => {
        // if(server.name.en != "Briggs"){
        //     server_pop = (server_info["result"][server["world_id"]][0]["nc"] 
        //             + server_info["result"][server["world_id"]][0]["tr"] 
        //             + server_info["result"][server["world_id"]][0]["vs"] 
        //             + server_info["result"][server["world_id"]][0]["ns"]);
        // }
        // if(server.name.en != "Briggs"){
        //     table_contents += ("<tr>" + "<td>" + server.name.en + "</td>" + "<td>" + server.world_id + "</td>" + "</tr>");
        // }
        // table_contents += "</table>";
        // table_div.innerHTML = table_contents;
        // });
    });
}

function fetch_data_from_URL(url){
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        return out;
    })
    .catch(err => {throw err});
}

function getServers(url, url2){
    return Promise.all([fetch_data_from_URL(url), fetch_data_from_URL(url2)]);
}

build_table();