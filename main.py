import requests
from time import sleep

#All game data requests follow the format: http://census.daybreakgames.com/[s:service_id]/format/verb/game/collection[/identifier][?modifier]
#All game image request follow the format: http://census.daybreakgames.com/[s:service_id]/img/game/collection/identifier[/imageType]

base_URL = "http://census.daybreakgames.com"
service_ID = "/s:freeongtaxi"
request_type = "/get"
PS2_API_version = "/ps2:v2"
DGC_request_URL_base = base_URL + service_ID + request_type +  PS2_API_version

fisu_pop_URL = "https://ps2.fisu.pw/api/population"
fisu_terry_URL = "https://ps2.fisu.pw/api/territory"

request_worlds =  DGC_request_URL_base + "/world/?c:limit=100"
server_list = requests.get(request_worlds).json()['world_list']
server_info = requests.get(fisu_pop_URL + "/?world=1,10,13,17,19,40").json()


for world in server_list:
    hossin = True

    if world["name"]["en"] != "Briggs":     # rip Briggs :(
        server_pop = (server_info["result"][world["world_id"]][0]["nc"] 
                        + server_info["result"][world["world_id"]][0]["tr"] 
                        + server_info["result"][world["world_id"]][0]["vs"] 
                        + server_info["result"][world["world_id"]][0]["ns"])
        if (server_pop > 600): 
            server_terry_caps = None
            while server_terry_caps is None:
                try:
                    server_terry_caps = requests.get(fisu_terry_URL + "/?world=" + [world["world_id"]][0] + "&continent=4").json()["result"][0]["continents"][0]["control"]
                    for cap in server_terry_caps:
                        if int(cap) > 40:
                            hossin = False
                except:
                    print("shits fucked for " + world["name"]["en"] + "... trying again")
                    sleep(15)
        else:
            hossin = False
        
    if world["name"]["en"] != "Briggs":     # rip Briggs :(
        print(world["name"]["en"] 
                + "\t\tid: " + world["world_id"] 
                + "\t\tpopulation: " + str(server_pop)
                + "\t\thossin?: "  + str(hossin))


