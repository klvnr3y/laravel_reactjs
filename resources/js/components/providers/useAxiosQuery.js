import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import companyInfo from "./companyInfo";

const apiUrl = companyInfo().apiUrl;
const token = companyInfo().token;

export function POST(url, key_name, onSuccessFunction) {
    const queryClient = useQueryClient();

    return useMutation(
        (data) =>
            axios
                .post(`${apiUrl}${url}`, data, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => res.data),
        {
            onSuccess: () => {
                if (onSuccessFunction) onSuccessFunction();
                if (key_name) {
                    if (typeof key_name === "string") {
                        queryClient.refetchQueries(key_name);
                    } else {
                        key_name.forEach((name) => {
                            queryClient.refetchQueries(name);
                        });
                    }
                }
            },
        }
    );
}

export function POSTFILE(url, key_name, onSuccessFunction) {
    const queryClient = useQueryClient();

    return useMutation(
        (data) =>
            axios
                .post(`${apiUrl}${url}`, data, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
        {
            onSuccess: () => {
                if (onSuccessFunction) onSuccessFunction();
                if (key_name) {
                    if (typeof key_name === "string") {
                        queryClient.refetchQueries(key_name);
                    } else {
                        key_name.forEach((name) => {
                            queryClient.refetchQueries(name);
                        });
                    }
                }
            },
        }
    );
}

export function UPDATE(url, key_name, onSuccessFunction) {
    const queryClient = useQueryClient();

    return useMutation(
        (data) =>
            axios
                .put(`${apiUrl}${url}/${data.id}`, data, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => res.data),
        {
            onSuccess: () => {
                if (onSuccessFunction) onSuccessFunction();
                // console.log(key_name);
                if (key_name) {
                    if (typeof key_name === "string") {
                        queryClient.refetchQueries(key_name);
                    } else {
                        key_name.forEach((name) => {
                            queryClient.refetchQueries(name);
                        });
                    }
                }
            },
        }
    );
}

export function DELETE(url, key_name, onSuccessFunction) {
    const queryClient = useQueryClient();

    return useMutation(
        (data) =>
            axios
                .delete(`${apiUrl}${url}/${data.id}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => res.data),
        {
            onSuccess: () => {
                if (onSuccessFunction) onSuccessFunction();
                if (key_name) {
                    if (typeof key_name === "string") {
                        queryClient.refetchQueries(key_name);
                    } else {
                        key_name.forEach((name) => {
                            queryClient.refetchQueries(name);
                        });
                    }
                }
            },
        }
    );
}

export function GET(url, key_name, onSuccessFunction) {
    return useQuery(
        key_name,
        () =>
            axios
                .get(`${apiUrl}${url}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => res.data),
        {
            retry: 1,
            retryDelay: 500,
            fetchOnWindowFocus: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                if (onSuccessFunction) onSuccessFunction(res);
            },
        }
    );
}

export function GETMANUAL(url, key_name, onSuccessFunction) {
    return useQuery(
        key_name,
        () =>
            axios
                .get(`${apiUrl}${url}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((res) => res.data),
        {
            enabled: false,
            retry: 1,
            retryDelay: 500,
            fetchOnWindowFocus: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                if (onSuccessFunction) onSuccessFunction(res);
            },
        }
    );
}
