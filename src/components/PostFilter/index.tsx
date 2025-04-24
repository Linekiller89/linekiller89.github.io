import React from "react";
import styled from "styled-components";
import { PostFilterProps } from "../../types";

const FilterWrapper = styled.div`
  margin-bottom: 2rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const PostFilter: React.FC<PostFilterProps> = ({
  onFilterChange,
  currentFilter,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <FilterWrapper>
      <FilterSelect value={currentFilter} onChange={handleChange}>
        <option value="all">All Posts</option>
        <option value="latest">Latest Posts</option>
        <option value="popular">Popular Posts</option>
      </FilterSelect>
    </FilterWrapper>
  );
};

export default PostFilter;
