import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Entry {
    id: number;
    profilePic: string;
    name: string;
    description: string;
    address: string;
    phoneNumber: string;
    email: string;
    roles: string[];
}

const mockEntries: Entry[] = [
    {
        id: 1,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Alice Smith",
        description: "Senior Front-end Developer",
        address: "123 Elm St",
        phoneNumber: "111-222-3333",
        email: "alice@example.com",
        roles: ["frontend"],
    },
    {
        id: 2,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Bob Johnson",
        description: "Junior Back-end Developer",
        address: "456 Oak St",
        phoneNumber: "444-555-6666",
        email: "bob@example.com",
        roles: ["backend"],
    },
    {
        id: 3,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Charlie Brown",
        description: "UX/UI Designer",
        address: "789 Pine St",
        phoneNumber: "777-888-9999",
        email: "charlie@example.com",
        roles: ["uxui"],
    },
    {
        id: 4,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "David Wilson",
        description: "Project Manager",
        address: "101 Maple St",
        phoneNumber: "000-111-2222",
        email: "david@example.com",
        roles: ["PM"],
    },
    {
        id: 5,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Eva Martinez",
        description: "Full Stack Developer",
        address: "202 Birch St",
        phoneNumber: "333-444-5555",
        email: "eva@example.com",
        roles: ["frontend", "backend"],
    },
    {
        id: 6,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Frank Thomas",
        description: "Team Lead",
        address: "303 Cedar St",
        phoneNumber: "666-777-8888",
        email: "frank@example.com",
        roles: ["teamlead"],
    },
    {
        id: 7,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Grace Lee",
        description: "Senior Data Scientist",
        address: "404 Fir St",
        phoneNumber: "999-000-1111",
        email: "grace@example.com",
        roles: ["data", "senior"],
    },
    {
        id: 8,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Hank White",
        description: "Backend Developer",
        address: "505 Spruce St",
        phoneNumber: "222-333-4444",
        email: "hank@example.com",
        roles: ["backend"],
    },
    {
        id: 9,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Ivy Green",
        description: "Marketing Specialist",
        address: "606 Ash St",
        phoneNumber: "555-666-7777",
        email: "ivy@example.com",
        roles: ["marketing"],
    },
    {
        id: 10,
        profilePic:
            "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUiThoZGGd4xqnYiMVQ.jpg",
        name: "Jack Davis",
        description: "Junior Customer Support",
        address: "707 Walnut St",
        phoneNumber: "888-999-0000",
        email: "jack@example.com",
        roles: ["support", "junior"],
    },
];

const Dashboard = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredEntries, setFilteredEntries] = useState(mockEntries);
    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        filterEntries(value, selectedRoles);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(value)
                ? prevRoles.filter((role) => role !== value)
                : [...prevRoles, value]
        );
    };

    const filterEntries = (searchText: string, roles: string[]) => {
        setFilteredEntries(
            mockEntries.filter(
                (entry) =>
                    entry.name.toLowerCase().includes(searchText.toLowerCase()) &&
                    (roles.length === 0 ||
                        roles.some((role) => entry.roles.includes(role)))
            )
        );
    };

    React.useEffect(() => {
        filterEntries(searchText, selectedRoles);
    }, [selectedRoles]);

    const showDetail = (entry: Entry) => {
        setSelectedEntry(entry);
    };

    const handleClose = () => {
        setSelectedEntry(null);
    };

    const uniqueRoles = Array.from(
        new Set(mockEntries.flatMap((entry) => entry.roles))
    );

    return (
        <div className="bg-[#1A1A1A] min-h-screen">
            <div className="flex justify-between items-center w-full p-8 py-4 border-b border-[#434343]">
                <div className="text-3xl text-white font-bold">Logo</div>
                <button
                    onClick={handleLogout}
                    className="p-2 px-4 border font-bold text-white rounded-full">
                    Logout
                </button>
            </div>

            <div className="px-16 pb-16">
                <h2 className="text-4xl font-bold mb-16 text-white text-center mt-16">
                    Dashboard
                </h2>
                <p className="text-lg mb-6 text-white">
                    Welcome, User! We’re glad to have you here. This is the Dashboard page
                    that allows you to search and filter data in the table.
                </p>
                <div className="flex flex-col border border-[#434343] rounded-lg p-4 mb-8 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Search By Name"
                            value={searchText}
                            onChange={handleSearch}
                            className="p-2 bg-[#2F2F2F] text-white rounded w-full"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 text-white">
                        {uniqueRoles.map((role) => (
                            <label key={role} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={role}
                                    checked={selectedRoles.includes(role)}
                                    onChange={handleRoleChange}
                                    className="appearance-none h-6 w-6 rounded-full border-2 border-[#f1f1f1] checked:bg-[#f1f1f1] checked:border-transparent focus:outline-none cursor-pointer"
                                />
                                <span className="text-sm">{role}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#2F2F2F] text-[#f1f1f1] border border-[#1D1E22]">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-[#626263]">Name</th>
                                <th className="py-2 px-4 border-b border-[#626263]">
                                    Description
                                </th>
                                <th className="py-2 px-4 border-b border-[#626263]">Address</th>
                                <th className="py-2 px-4 border-b border-[#626263]">Phone</th>
                                <th className="py-2 px-4 border-b border-[#626263]">Email</th>
                                <th className="py-2 px-4 border-b border-[#626263]">Roles</th>
                                <th className="py-2 px-4 border-b border-[#626263]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.map((entry) => (
                                <tr
                                    key={entry.id}
                                    className="hover:bg-[#424242]"
                                    onClick={() => showDetail(entry)}>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        {entry.name}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        {entry.description}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        {entry.address}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        {entry.phoneNumber}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        {entry.email}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        {entry.roles.join(", ")}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#626263]">
                                        <button
                                            onClick={() => showDetail(entry)}
                                            className="p-1 bg-black text-white rounded">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedEntry && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
                    onClick={handleClose}>
                    <div
                        className="bg-[#141414] p-6 rounded shadow-lg text-white w-[400px]"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end ">
                            <button onClick={handleClose}>x</button>
                        </div>

                        <div className="flex w-full justify-center mb-4">
                            <img
                                className=" rounded-full w-32 h-32 object-cover"
                                src={selectedEntry.profilePic}></img>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{selectedEntry.name}</h3>
                        <p>
                            <strong>Roles:</strong> {selectedEntry.roles.join(", ")}
                        </p>
                        <p>
                            <strong>Phone:</strong> {selectedEntry.phoneNumber}
                        </p>

                        <p>
                            <strong>Email:</strong> {selectedEntry.email}
                        </p>
                        <p>
                            <strong>Address:</strong> {selectedEntry.address}
                        </p>
                        <p>
                            <strong>Description:</strong> {selectedEntry.description}
                        </p>



                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
