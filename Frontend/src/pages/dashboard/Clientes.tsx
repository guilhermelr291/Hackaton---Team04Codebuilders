import React, { useState,useCallback} from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight ,Plus} from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const data = [
	{ name: "João Silva", age: 29, city: "São Paulo",project : 1 },
	{ name: "Maria Oliveira", age: 34, city: "Rio de Janeiro",project : 1 },
	{ name: "Carlos Souza", age: 23, city: "Belo Horizonte",project : 1 },
	{ name: "Ana Costa", age: 25, city: "Curitiba",project : 1 },
	{ name: "Pedro Santos", age: 31, city: "Salvador",project : 1 },
	{ name: "Lucia Martins", age: 27, city: "Fortaleza",project : 1 },
	{ name: "Fernanda Lima", age: 35, city: "Recife",project : 1 },
	{ name: "Lucas Pereira", age: 30, city: "Porto Alegre",project : 1 },
	{ name: "Camila Rocha", age: 22, city: "Goiânia",project : 1 },
	{ name: "Bruna Alves", age: 28, city: "Manaus",project : 1 },
];

const columns = [
	{ key: "name", label: "Nome" },
	{ key: "age", label: "Idade" },
	{ key: "city", label: "Cidade" },
	{ key: "project", label: "Projetos" },
	{ key: "actions", label: "Ações" },
]


const Clientes = () => {
		
	const [search, setSearch] = useState("");
	const [sortConfig, setSortConfig] = useState({ key: 'name', direction: "asc" });
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const handleSearch = (event) => {
		setSearch(event.target.value);
		setCurrentPage(1); // Reset to page 1 when searching
	};

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const filteredData = data.filter((item) => {
		return (
			item.name.toLowerCase().includes(search.toLowerCase()) ||
			item.city.toLowerCase().includes(search.toLowerCase())
		);
	});

	const sortedData = [...filteredData].sort((a, b) => {
		if (sortConfig.key === null) return 0;
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];
		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});

	const pageCount = Math.ceil(sortedData.length / itemsPerPage);

	const currentPageData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const onNextPage = useCallback(() => {
		setCurrentPage(Math.max(1, currentPage - 1))
	}, [currentPage]);

	const onPreviousPage = useCallback(() => {
		setCurrentPage(Math.min(pageCount, currentPage + 1))

	}, [currentPage, pageCount]);


  	return (

		<>
			
			<div className="px-2 py-6 flex justify-end">
				<Dialog>
					<DialogTrigger asChild>
						<Button color="secondary" >< Plus className="mr-0.5"/>Adicionar Cliente</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<label htmlFor="name" className="text-right">
									Name
								</label>
								<input
									id="name"
									defaultValue="Pedro Duarte"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<label htmlFor="username" className="text-right">
									Username
								</label>
								<input
									id="username"
									defaultValue="@peduarte"
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

			</div>

			<div className="w-full  mx-auto bg-white p-6 shadow-md rounded-lg ">
				<div className="mb-4 flex justify-between items-center">
					<input
						type="text"
						placeholder="Buscar..."
						value={search}
						onChange={handleSearch}
						className="p-2 border border-gray-300 rounded"
					/>
				
				</div>
				<table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
					<thead className="bg-gray-100">
						<tr>
							{columns.map((column) => (							
								<th
									className="sortable p-3 text-left cursor-pointer text-black hover:text-gray-700"
									onClick={() => handleSort(column.key)}
									>
										{column.label}
										{sortConfig.key === column.key && (
											<>
												{sortConfig.direction === "asc" ? (
													<ChevronUp className="inline ml-2" />
												) : (
													<ChevronDown className="inline ml-2" />
												)}
											</>
									)}
								
								</th>
							))}						
						</tr>
					</thead>
					<tbody>
						{currentPageData.map((row, index) => (
							<tr key={index} className="border-b hover:bg-gray-50">
								<td className="p-3">{row.name}</td>
								<td className="p-3">{row.age}</td>
								<td className="p-3">{row.city}</td>
								<td className="p-3">{row.project}</td>
								<td className="p-3">
									<button className="text-blue-500 hover:text-blue-700">Editar</button>
									<button className="text-red-500 hover:text-red-700 ml-2">Excluir</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			

			<div className="mt-2 flex justify-center items-center">
				<button
					onClick={onNextPage}
					className="text-gray-600 p-2 hover:bg-gray-100 rounded"
				>
					<ChevronLeft />
				</button>
				<span className="text-gray-600">
					Página {currentPage} de {pageCount}
				</span>
				<button
					onClick={onPreviousPage}
					className="text-gray-600 p-2 hover:bg-gray-100 rounded"
				>
					<ChevronRight />
				</button>
			</div>
			</div>
		
		</>
	
  );
};

export default Clientes;
