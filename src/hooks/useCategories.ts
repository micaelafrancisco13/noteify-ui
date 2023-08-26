import { useEffect, useState } from "react";
import categoryService, { NoteCategory } from "../services/category-service.ts";
import { AxiosError } from "axios";

function useCategories() {
    const [categories, setCategories] = useState<NoteCategory[]>([]);
    const [categoryIDs, setCategoryIDs] = useState<string[]>([]);
    const [isFetchingCategories, setIsFetchingCategories] = useState(false);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        setIsFetchingCategories(true);
        const result = categoryService.getAll<NoteCategory>();
        if (result) {
            const { response, cancel } = result;

            response
                .then((res) => {
                    setCategories(res.data);
                    setCategoryIDs(res.data.map((c) => c._id));
                    setIsFetchingCategories(false);
                })
                .catch((err) => {
                    setError(err);
                    setIsFetchingCategories(false);
                });

            return () => cancel();
        }
    }, []);

    const categoryErrorMessage = error?.message;
    const categoryStatusCode = error?.response?.status;

    return {
        categories,
        categoryIDs,
        isFetchingCategories,
        categoryErrorMessage,
        categoryStatusCode,
    };
}

export default useCategories;
