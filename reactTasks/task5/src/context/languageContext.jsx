import { useContext , useState , createContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language , setLanguage] = useState('en');
    return (
        <LanguageContext.Provider value={{language , setLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}


// eslint-disable-next-line react-hooks/rules-of-hooks
export const uselanguage = () => useContext(LanguageContext);