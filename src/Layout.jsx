import { Outlet, Link } from 'react-router-dom';

const App = () => {
    return (
        <div className="grid grid-cols-6 min-h-screen">
            <div className="bg-slate-800 col-span-1">
                <aside className="h-full">
                    <div className="pt-6 w-full">
                        <div className="bg-slate-400 w-28 h-28 rounded-full mx-auto"></div>
                        <p className="pt-3 text-center text-white">Eduardo Rodriguez</p>
                    </div>

                    <nav className="flex flex-col mt-8 text-white">
                        <Link className="px-3 py-2 ml-4 max-w-48 w-full hover:bg-slate-500 hover:rounded-md" to={'/'}>
                            Inicio
                        </Link>
                        <Link className="px-3 py-2 ml-4 max-w-48 w-full hover:bg-slate-500 hover:rounded-md" to={'/expense'}>
                            Gastos
                        </Link>

                        <Link className="px-3 py-2 ml-4 max-w-48 w-full hover:bg-slate-500 hover:rounded-md" to={'/reportMonth'}>
                            Reporte del Mes
                        </Link>
                        <Link className="px-3 py-2 ml-4 max-w-48 w-full hover:bg-slate-500 hover:rounded-md" href="#">
                            Configuracion
                        </Link>
                    </nav>
                </aside>
            </div>
            <div className="bg-zinc-900 col-span-5 flex">
                <div className="size-11/12 m-auto text-stone-400">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default App;
