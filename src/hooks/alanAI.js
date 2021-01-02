import {useEffect, useState, useCallback} from 'react'
import alanBtn from "@alan-ai/alan-sdk-web"
import resultList from "./w3school_scrape/scrape.js"

const COMMANDS = {
    SHOW_NUMBER_OF_TUTORIAL : 'show-number-of-tutorial',
    SHOW_JAVA : 'show-Java',
    SHOW_PHP : 'show-Php',
    SHOW_PYTHON : 'show-Python',
    SHOW_JAVASCRIPT : 'show-Js',
    BEST_AI_LANGUAGE : 'best-ai-language'
}

// Use asynchronous to make the bot says before the alert popup
let botSays = (answer) => {
    setTimeout(() => { alert(answer)
    }, 2000)
}
let key = process.env.ALAN_KEY;

export default function useAlan(){
    const [alanInstance, setAlanInstance] = useState()

    // Give the answers
    const showNumberOfTutorial = useCallback(() => {
        alanInstance.playText("I know " + resultList.length + "best tutorials")
        botSays('This is my answer :' + resultList.length)
    }, [alanInstance])
    const showJavaInfo = useCallback(() => {
        alanInstance.playText("Java is a popular programming language, created in 1995 " +
            "This is the object oriented programming language" +
            "If you want to learn more about Java please follow the link https://www.w3schools.com/Java/java_intro.asp ")
        botSays('This is my answer : https://www.w3schools.com/Java/java_intro.asp')
    }, [alanInstance])

    const showPhpInfo = useCallback(() => {
        alanInstance.playText("PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages." +
            "PHP is an acronym for Hypertext Preprocessor" +
            "If you want to learn more about PHP please follow the link https://www.w3schools.com/Php/php_intro.asp ")
        botSays('This is my answer : https://www.w3schools.com/Php/php_intro.asp')
    }, [alanInstance])

    const showPythonInfo = useCallback(() => {
        alanInstance.playText("Python is a popular programming language. It was created by Guido van Rossum, and released in 1991" +
            "It is used for web development server side , software development , mathematics ,and system scripting " +
            "If you want to learn more about Python please follow the link https://www.w3schools.com/Python/python_intro.asp ")
        botSays('This is my answer : https://www.w3schools.com/Python/python_intro.asp')
    }, [alanInstance])

    // Add event Listener. For each commands, each answers will be given
    useEffect(() => {
        window.addEventListener(COMMANDS.SHOW_NUMBER_OF_TUTORIAL, showNumberOfTutorial)
        window.addEventListener(COMMANDS.SHOW_JAVA, showJavaInfo)
        window.addEventListener(COMMANDS.SHOW_PHP, showPhpInfo)
        window.addEventListener(COMMANDS.SHOW_PYTHON, showPythonInfo)
        return () => {
            window.removeEventListener(COMMANDS.SHOW_NUMBER_OF_TUTORIAL, showNumberOfTutorial)
            window.removeEventListener(COMMANDS.SHOW_JAVA, showJavaInfo)
            window.removeEventListener(COMMANDS.SHOW_PHP, showPhpInfo)
            window.removeEventListener(COMMANDS.SHOW_PYTHON, showPythonInfo)
        }
    },[showNumberOfTutorial, showJavaInfo, showPhpInfo, showPythonInfo])

    // Connect this website with Alan AI by the key
    useEffect(() => {
        if (alanInstance != null ) return
        setAlanInstance(
            alanBtn({
                key: key, // get the key to access Alan AI
                onCommand: ({command}) => {
                    window.dispatchEvent(new CustomEvent(command))
                    console.log(command)
                }
            })
        )

    },[])
    return null
}