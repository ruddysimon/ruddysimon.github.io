import { User, Briefcase, FolderGit2, BookOpen, FileText, Mail, Settings, TerminalSquare, Plane } from "lucide-react";
import { AppDef, AppId } from "../WindowManager";
import AboutApp from "./AboutApp";
import ExperienceApp from "./ExperienceApp";
import ProjectsApp from "./ProjectsApp";
import BooksApp from "./BooksApp";
import ResumeApp from "./ResumeApp";
import ContactApp from "./ContactApp";
import SettingsApp from "./SettingsApp";
import TerminalApp from "./TerminalApp";
import ChatbotApp from "./ChatbotApp";
import TravelApp from "./TravelApp";
import HappyMacIcon from "./HappyMacIcon";

export const APPS: Record<AppId, AppDef> = {
  about:      { id: "about",      title: "about.txt",   icon: User,           Component: AboutApp,      defaultSize: { w: 640, h: 500 } },
  experience: { id: "experience", title: "experience",  icon: Briefcase,      Component: ExperienceApp, defaultSize: { w: 720, h: 560 } },
  projects:   { id: "projects",   title: "projects",    icon: FolderGit2,     Component: ProjectsApp,   defaultSize: { w: 780, h: 560 } },
  books:      { id: "books",      title: "library",     icon: BookOpen,       Component: BooksApp,      defaultSize: { w: 820, h: 600 } },
  travel:     { id: "travel",     title: "travel",      icon: Plane,          Component: TravelApp,     defaultSize: { w: 720, h: 560 } },
  resume:     { id: "resume",     title: "resume.pdf",  icon: FileText,       Component: ResumeApp,     defaultSize: { w: 560, h: 420 } },
  contact:    { id: "contact",    title: "contact",     icon: Mail,           Component: ContactApp,    defaultSize: { w: 520, h: 440 } },
  terminal:   { id: "terminal",   title: "terminal",    icon: TerminalSquare, Component: TerminalApp,   defaultSize: { w: 620, h: 400 } },
  chatbot:    { id: "chatbot",    title: "Simon",       icon: HappyMacIcon,   Component: ChatbotApp,    defaultSize: { w: 500, h: 580 } },
  settings:   { id: "settings",   title: "Settings",    icon: Settings,       Component: SettingsApp,   defaultSize: { w: 760, h: 640 } },
};
