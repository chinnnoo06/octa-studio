type TTableHeadProps = {
    columns: readonly string[];
    alignLast?: boolean;
};

export const TableHead = ({ columns, alignLast = true }: TTableHeadProps) => {
    return (
        <thead className="border-secondary/30 text-secondary border-b text-xs uppercase">
            <tr>
                {columns.map((column, i) => (
                    <th
                        key={column}
                        scope="col"
                        className={`px-5 py-4 text-sm lg:text-base align-top ${alignLast && i === columns.length - 1 ? 'text-right' : ''}`}
                    >
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
