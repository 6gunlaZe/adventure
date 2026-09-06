const servers = {};

for (const serverData of parent.X.servers) {
    const socket = parent.io(`wss://${serverData.address}`, {
        transports: ["websocket"],
        path: serverData.path
    });

    socket.on("server_info", data => {
        servers[serverData.key] = {
            server: serverData.key,
            region: serverData.region,
            name: serverData.name,
            info: data
        };
    });
}

// Kiểm tra dữ liệu mỗi 10 giây
setInterval(() => {
    console.clear();

    console.log(JSON.stringify(servers, null, 2));
}, 10000);
