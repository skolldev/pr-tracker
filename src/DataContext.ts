import { createContext } from "react";
import { ILibrary } from "./models/library.interface";

const DataContext = createContext<ILibrary>({});

export default DataContext;
