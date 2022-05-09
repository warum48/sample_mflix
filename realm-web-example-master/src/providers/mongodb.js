import React, { useContext, useEffect, useState } from "react"

import { useRealmApp } from "./realm"

const MongoDBContext = React.createContext(null)

const MongoDB = ({ children }) => {
    const { user } = useRealmApp()
    const [db, setDb] = useState(null)

    useEffect(() => {
      console.log('process.env.REACT_APP_REALM_SERVICE_NAME',process.env.REACT_APP_REALM_SERVICE_NAME);
        if (user !== null) {
            const realmService = user.mongoClient(
                //process.env.REACT_APP_REALM_SERVICE_NAME
              "mongodb-atlas"
            )
            setDb(realmService.db(
              //process.env.REACT_APP_DB_NAME
              "sample_mflix"
            ))
        }
    }, [user])

    return (
        <MongoDBContext.Provider
            value={{
                db,
            }}
        >
            {children}
        </MongoDBContext.Provider>
    )
}

export const useMongoDB = () => {
    const mdbContext = useContext(MongoDBContext)
    if (mdbContext == null) {
        throw new Error("useMongoDB() called outside of a MongoDB?")
    }
    return mdbContext
}

export default MongoDB
