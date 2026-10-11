type TTableHeadProps = {
    columns: readonly string[];
    alignLast?: boolean;
};

export const TableHead = ({ columns, alignLast = true }: TTableHeadProps) => {
    return (
        <thead className="border-secondary/30 text-secondary border-b uppercase">
            <tr>
                {columns.map((column, i) => (
                    <th
                        key={column}
                        scope="col"
                        className={`font-bold p-5 text-base lg:text-lg align-top ${alignLast && i === columns.length - 1 ? 'text-right' : ''}`}
                    >
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
