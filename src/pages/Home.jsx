import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { collection, query, where, getDoc } from "@firebase/firestore";
import { auth, db, logout } from "../components/authentication/firebase";
import Banner from '../components/Banner'
import Products from '../components/Products'

function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [screen, setScreen] = useState("Products")
    const history = useHistory();
    const fetchUserName = async () => {
        try {
            /*
            const query = await db
              .collection("users")
              .where("uid", "==", user?.uid)
              .get();
              */

            const q = query(collection(db, "cartUsers"), where("uid", "==", user?.uid));
            const data = await getDoc(q).data()
            if (user.exists()) {
                setName(data.name);
            }

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data" + err + "");
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");
        fetchUserName();
    }, [user, loading]);
    return (
        <div>

            <Banner />
            <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
            <Products />


        </div>
    )
}

export default Home