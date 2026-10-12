"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFloppyDisk } from "react-icons/fa6";
import { toast } from "react-toastify";

import { BlogCategoryFormSchema, TBlogCategoryForm } from "@/schemas/blogCategory/blogCategory.form.schemas";
import { TBlogCategory } from "@/schemas/blogCategory/blogCategory.schemas";
import { useBlogCategory } from "@/hooks/useBlogCategory";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ADMIN_FORM_ID } from "@/components/ui/buttons/FormSubmitButton";
import { BlogCategoryFields } from "./BlogCategoryFields";

export const EditBlogCategoryForm = ({ category }: { category: TBlogCategory }) => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TBlogCategoryForm>({
        resolver: zodResolver(BlogCategoryFormSchema),
        defaultValues: {
            name: category.name,
            slug: category.slug,
            description: category.description,
            seo: { metaTitle: category.seo.metaTitle, metaDescription: category.seo.metaDescription },
        },
    });

    const { updateBlogCategory } = useBlogCategory();

    useEffect(() => {
        if (updateBlogCategory.error) toast.error(updateBlogCategory.error);
        if (updateBlogCategory.success) {
            toast.success(updateBlogCategory.success);
            router.push("/admin/blog-categorias");
        }
    }, [updateBlogCategory.error, updateBlogCategory.success, router]);

    const onSubmit = (data: TBlogCategoryForm) => updateBlogCategory.handleUpdateBlogCategory(category._id, data);

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <BlogCategoryFields register={register} control={control} setValue={setValue} errors={errors} />

            <ActionButton loading={updateBlogCategory.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {updateBlogCategory.loading ? "Guardando..." : "Guardar cambios"}
            </ActionButton>
        </form>
    );
};
