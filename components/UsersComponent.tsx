"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";

import { ALL_USERS_QUERYResult } from "@/sanity.types";
import UserStatusSelect from "./UserStatusSelect";

const UsersComponent = ({ users }: { users: ALL_USERS_QUERYResult }) => {
  return (
    <>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user._id}
            className="h-12 cursor-pointer hover:bg-gray-100"
          >
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              {user.address?.street},{user.address?.postalCode},
              {user.address?.city}
            </TableCell>
            <TableCell>{user.orders?.length}</TableCell>
            <TableCell>
              <UserStatusSelect user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default UsersComponent;
