
export function Private({children}){
    const userNotLoggedIn = false;

    if(!userNotLoggedIn){
        // Redirect to login
        console.log("redirect to login");
        return null;
    }

    return <>{children}</>
}