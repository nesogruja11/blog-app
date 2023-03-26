import React, { useContext } from 'react'

const ServerContext = React.createContext({});

export const useServer = () => {
    return useContext(ServerContext);
}

export function ServerProvider({children}) {
    const defaultServer = "127.0.0.1";
    const defaultPort = "7264";

    const setItems = (server, port) => {
        localStorage.setItem('server-app', server);
        localStorage.setItem('port-app', port)
    }

    const getServer = () => {
        var server = localStorage.getItem('server-app')
        return server ? server : defaultServer ;
    }

    const getPort = () => {
        var port = localStorage.getItem('port-app');
        return port ? port : defaultPort;
    }


    const value = {
        getServer,
        getPort,
        setItems
    }

    return <ServerContext.Provider value={value}>
        {children}
    </ServerContext.Provider>
}
